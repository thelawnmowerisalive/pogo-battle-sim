import Pokedex from "../model/Pokedex";
import PokemonMove from "../model/PokemonMove";
import PokemonState from "./PokemonState";
import TrainerState from "./TrainerState";
import Turn, { ID, Side } from "./Turn";
import TypeEffectiveness from "./TypeEffectiveness";

class Battle {

    // trainers
    trainer: TrainerState;
    rocket: TrainerState;

    // pokemon
    left!: PokemonState;
    right!: PokemonState;

    winner!: TrainerState;

    turn: Turn = new Turn(-1);
    log: Turn[] = [];

    constructor(trainer: any, rocket: any) {
        this.trainer = new TrainerState(trainer);
        this.rocket = new TrainerState(rocket);
    }

    simulate(): Battle {
        // send first pokemon for each battler
        this.left = this.trainer.team[0];
        this.right = this.rocket.team[0];

        this.turn.left = new Side(ID.SWITCH_IN, this.trainer.trainer.name + ' sent out ' + this.left.pokemon.name);
        this.turn.right = new Side(ID.SWITCH_IN, this.rocket.trainer.name + ' sent out ' + this.right.pokemon.name);
        this.addToLog(this.turn);

        // start the timer
        do {
            this.takeTurn();

            if (this.turn.count > 300) {
                // something went wrong, end the battle forcefully
                break;
            }
        } while (!this.winner);

        return this;
    }

    private takeTurn() {
        this.turn = new Turn(1 + this.turn.count);

        // try using charged moves first
        var threwCharged = false;
        if (this.trainer.trainer.strategy.autoThrowCharged) {
            threwCharged = threwCharged || this.attemptChargedMove(LEFT);
        }
        if (!threwCharged && this.rocket.trainer.strategy.autoThrowCharged) {
            threwCharged = threwCharged || this.attemptChargedMove(RIGHT);
        }

        // use fast move otherwise
        if (!threwCharged) {
            this.trainer.trainer.strategy.autotap && this.useFastMove(LEFT);
            this.rocket.trainer.strategy.autotap && this.useFastMove(RIGHT);
        }

        // add to log now, in case the attacks add their own over-entries on this turn
        this.addToLog(this.turn);

        // check win condition
        this.checkWinConditionForSide(LEFT);
        this.checkWinConditionForSide(RIGHT);

        if (this.winner) {
            console.log('CONGRATULATIONS ' + this.winner.trainer.name);
        }
    }

    private attemptChargedMove(left: boolean): boolean {
        // first check if stunned
        const trainer = left ? this.trainer : this.rocket;
        if (trainer.wakeUpTurn > this.turn.count) {
            return false;
        }
        
        const attacker = left ? this.left : this.right;
        const defender = left ? this.right : this.left;

        // pick the charged move with the lowest energy
        // CAUTION: energy is a negative number!
        const charged_1 = Pokedex.INSTANCE.moves[attacker.pokemon.moves.charged_1];
        const charged_2 = attacker.pokemon.moves.charged_2 ?
            Pokedex.INSTANCE.moves[attacker.pokemon.moves.charged_2] : undefined;
        var move = charged_1;
        if (charged_2) {
            if (charged_2.energy > charged_1.energy) {
                move = charged_2;
            }
        }

        // can attack only if enough energy
        if (attacker.energy + move.energy >= 0) {
            // use energy and 
            attacker.energy += move.energy;

            // reset fast move cooldown TODO at least I think we should?
            attacker.last = -10;

            // add a "charging energy" over-entry
            const turn = new Turn(this.turn.count, 'charging');
            if (left) {
                turn.left = new Side(ID.CHARGING);
            } else {
                turn.right = new Side(ID.CHARGING);
            }
            this.addToLog(turn);

            // check if defender is shielding
            const opponent = left ? this.rocket : this.trainer;
            var shielding = false;
            if (opponent.shields) {
                switch (opponent.trainer.strategy.shields) {
                    case "always":
                        shielding = true;
                        break;
                    default:
                        break;
                }
            }

            if (shielding) {
                // burn a shield
                opponent.shields--;
                if (left) {
                    this.turn.right = new Side(ID.SHIELDING);
                } else {
                    this.turn.left = new Side(ID.SHIELDING);
                }
            }

            // deal damage
            const damage = shielding ?
                { amount: 0, eff: 1, type: move.type.substring(13) }
                : this.damageFormula(move, attacker, defender);
            defender.HP -= damage.amount;

            // add to log
            const eff = damage.eff === 1 ? ''
                : (damage.eff > 1 ? 'It\'s super effective!' : 'It\'s not very effective!');
            const side = new Side(ID.CHARGED_MOVE, `${attacker.pokemon.name} used ${move.id} (${damage.amount} damage). ${eff}`);
            side.data = damage;
            if (left) {
                this.turn.left = side;
            } else {
                this.turn.right = side;
            }

            // stun rocket
            this.rocket.wakeUpTurn = 6 + this.turn.count;

            return true;
        }

        return false;
    }

    private useFastMove(left: boolean) {
        // first check if stunned
        const trainer = left ? this.trainer : this.rocket;
        if (trainer.wakeUpTurn > this.turn.count) {
            return;
        }

        const attacker = left ? this.left : this.right;
        const defender = left ? this.right : this.left;

        // can attack only if not on cooldown
        const move = Pokedex.INSTANCE.moves[attacker.pokemon.moves.fast];
        if (this.turn.count >= move.turns + attacker.last) {
            // charge energy and deal damage
            attacker.energy += move.energy;
            const damage = this.damageFormula(move, attacker, defender);
            defender.HP -= damage.amount;

            attacker.last = this.turn.count;

            // add to log
            const eff = damage.eff === 1 ? ''
                : (damage.eff > 1 ? 'It\'s supereffective!' : 'It\'s not very effective!');
            const side = new Side(ID.FAST_MOVE, `${attacker.pokemon.name} used ${move.id} (${damage.amount} damage). ${eff}`);
            side.data = damage;
            if (left) {
                this.turn.left = side;
            } else {
                this.turn.right = side;
            }
        }
    }

    private checkWinConditionForSide(left: boolean) {
        const trainer = left ? this.trainer : this.rocket;
        const pokemon = left ? this.left : this.right;
        if (pokemon.HP <= 0) {
            // current pokemon is dead
            trainer.dead++;

            const turn = new Turn(this.turn.count, 'fainted' + left);
            const side = new Side(ID.FAINTED, pokemon.pokemon.name + ' fainted!');
            if (left) {
                turn.left = side;
            } else {
                turn.right = side;
            }
            this.addToLog(turn);

            if (trainer.dead >= trainer.team.length) {
                // all this trainer's pokemon are dead, battle is over
                this.winner = (left ? this.rocket : this.trainer);
            } else {
                // send out the next one
                this.sendOutNextPokemon(left);
            }
        }
    }

    private sendOutNextPokemon(left: boolean) {
        const trainer = left ? this.trainer : this.rocket;

        for (let pokemon of trainer.team) {
            if (pokemon.HP > 0) {
                const turn = new Turn(this.turn.count, 'switch' + left);
                const side = new Side(ID.SWITCH_IN, trainer.trainer.name + ' sent out ' + pokemon.pokemon.name);

                if (left) {
                    turn.left = side;
                    this.left = pokemon;
                } else {
                    turn.right = side;
                    this.right = pokemon;
                }

                this.addToLog(turn);

                // stun rocket
                this.rocket.wakeUpTurn = 6 + this.turn.count;

                break;
            }
        }
    }

    // TODO TODO TODO USE CORRECT MODIFIER !!!
    private damageFormula(move: PokemonMove, attacker: PokemonState, defender: PokemonState) {
        // 1 + (0.5 * power * atk/def * modifier)
        // modifier = 1.3 * type eff * STAB * charge (assume 1 for now)

        const attack = attacker.pokemon.attack * (attacker.pokemon.shadow ? SHADOW_ATTACK_MODIFIER : 1);
        const defense = defender.pokemon.defense * (defender.pokemon.shadow ? SHADOW_DEFENSE_MODIFIER : 1);

        const attackerTypes = Pokedex.INSTANCE.pokemon[attacker.pokemon.name].types;
        const STAB = attackerTypes.indexOf(move.type) < 0 ? 1 : 1.2;

        var eff = 1;
        const type = move.type.substring(13);
        const typeEffectiveness = TypeEffectiveness.get(type);
        const defenderTypes = Pokedex.INSTANCE.pokemon[defender.pokemon.name].types;
        defenderTypes.forEach(type => {
            eff *= typeEffectiveness.multiplier(type.substring(13));
        });

        const modifier = 1.3 * eff * STAB;

        return {
            eff,
            type,
            amount: Math.floor(1 + (0.5 * move.power * (attack / defense) * modifier))
        };
    }

    private addToLog(turn: Turn) {
        this.log.push(turn);

        // record the current HP and energy for everyone
        turn.left.HP = this.trainer.team.map((state) => state.HP);
        turn.left.energy = this.trainer.team.map((state) => state.energy);
        turn.right.HP = this.rocket.team.map((state) => state.HP);
        turn.right.energy = this.rocket.team.map((state) => state.energy);
    }

    public getTurn(key: string): Turn | undefined {
        const count = parseInt(key);
        const over = key.substring(key.indexOf('+') + 1);
        for (let turn of this.log) {
            if (count === turn.count && over === turn.over) {
                return turn;
            }
        }
    }
}

const LEFT = true;
const RIGHT = false;

const SHADOW_ATTACK_MODIFIER = 6 / 5;
const SHADOW_DEFENSE_MODIFIER = 5 / 6;

export default Battle;