import { ENTRY_FAST_MOVE } from "../Constants";
import TypeEffectiveness from "../TypeEffectiveness";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import PokemonMove from "./PokemonMove";
import Trainer from "./Trainer";

class Battle {
    pokedex: Pokedex;

    // trainers
    trainer: TrainerState;
    rocket: TrainerState;

    // pokemon
    left!: PokemonState;
    right!: PokemonState;

    turn: number = -1;
    winner!: TrainerState;

    log: LogEntry[] = [];

    constructor(pokedex: Pokedex, trainer: any, rocket: any) {
        this.pokedex = pokedex;

        this.trainer = new TrainerState(trainer);
        this.rocket = new TrainerState(rocket);
    }

    simulate() {
        // send first pokemon for each battler
        this.left = this.trainer.team[0];
        this.right = this.rocket.team[0];

        // start the timer
        do {
            this.takeTurn();
        } while (!this.winner);
    }

    private takeTurn() {
        this.turn++;

        // const canTrainerUseChargedMove = this.#attemptChargedMove(this.left);
        // const canRocketUseChargedMove = this.#attemptChargedMove(this.right);

        this.useFastMove(this.left, this.right);
        this.useFastMove(this.right, this.left);

        // check win condition
        this.checkWinCondition();

        if (this.winner) {
            console.log('CONGRATULATIONS ' + this.winner.trainer.name);
        }
    }

    private attemptChargedMove() {
        return false; // TODO
    }

    useFastMove(attacker: PokemonState, defender: PokemonState) {
        // can attack only if not on cooldown
        const move = this.pokedex.moves[attacker.pokemon.moves.fast];
        if (this.turn >= move.turns + attacker.last) {
            // charge energy and deal damage
            attacker.energy += move.energy;
            const damage = this.damageFormula(move, attacker, defender);
            defender.HP -= damage.amount;

            attacker.last = this.turn;

            // add to log
            const entry = new LogEntry(this.turn, ENTRY_FAST_MOVE);
            const eff = damage.eff == 1 ? '' : (damage.eff > 1 ? 'It\'s supereffective!' : 'It\'s not very effective!');
            entry.text = `${attacker.pokemon.name} used ${move.id} (${damage.amount} damage). ${eff}`;
            entry.left = (attacker == this.left);
            entry.data.eff = damage.eff;
            this.log.push(entry);
        }
    }

    private checkWinCondition() {
        // check if trainer's pokemon died
        if (this.left.HP <= 0) {
            this.trainer.dead++;
            if (this.trainer.dead >= 1) {
                this.winner = this.rocket;
            }
        }

        // check if rocket's pokemon died
        if (this.right.HP <= 0) {
            this.rocket.dead++;
            if (this.rocket.dead >= 1) {
                this.winner = this.trainer;
            }
        }
    }

    private damageFormula(move: PokemonMove, attacker: PokemonState, defender: PokemonState) {
        // 1 + (0.5 * power * atk/def * STAB * eff)

        const attack = this.pokedex.pokemon[attacker.pokemon.name].stats.attack;
        const defense = this.pokedex.pokemon[defender.pokemon.name].stats.defense;
        
        const attackerTypes = this.pokedex.pokemon[attacker.pokemon.name].types;
        const STAB = attackerTypes.indexOf(move.type) < 0 ? 1 : 1.2;
        
        var eff = 1;
        const typeEffectiveness = TypeEffectiveness.get(move.type.substring(13));
        const defenderTypes = this.pokedex.pokemon[defender.pokemon.name].types;
        defenderTypes.forEach(type => {
            eff *= typeEffectiveness.multiplier(type.substring(13));
        });

        return {
            eff,
            amount: Math.floor(1 + (0.5 * move.power * (attack/defense) * STAB * eff))
        };
    }

}

class LogEntry {
    turn: number;
    type: string;
    text?: string;
    left = false;
    data: any = {};

    constructor(turn: number, type: string) {
        this.turn = turn;
        this.type = type;
    }
}

class TrainerState {
    trainer: Trainer;
    team: PokemonState[] = [];

    dead = 0;

    constructor(trainer: Trainer) {
        this.trainer = trainer;
        this.team.push(new PokemonState(trainer.team[0]));
        this.team.push(new PokemonState(trainer.team[1]));
        this.team.push(new PokemonState(trainer.team[2]));
    }
}

class PokemonState {
    pokemon: Pokemon;

    // current HP and charged energy
    HP: number;
    energy: number = 0;

    last = -10;

    constructor(pokemon: Pokemon) {
        this.pokemon = pokemon;

        // round down for actual HP
        this.HP = Math.floor(pokemon.HP);
    }
}

class Turn {
    index: number;
    constructor(index: number) {
        this.index = index;
    }
}

class Action {
    trainer: Trainer;
    pokemon: Pokemon;
    constructor(trainer: Trainer, pokemon: Pokemon) {
        this.trainer = trainer;
        this.pokemon = pokemon;
    }
}

export default Battle;