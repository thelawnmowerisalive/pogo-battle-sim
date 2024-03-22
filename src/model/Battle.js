import { ENTRY_FAST_MOVE } from "../Constants";
import TypeEffectiveness from "../TypeEffectiveness";

class Battle {
    pokedex;

    // trainers
    trainer;
    rocket;

    // pokemon
    left;
    right;

    turn = -1;
    winner;

    log = [];

    constructor(pokedex, trainer, rocket) {
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
            this.#takeTurn();
        } while (!this.winner);
    }

    #takeTurn() {
        this.turn++;

        // const canTrainerUseChargedMove = this.#attemptChargedMove(this.left);
        // const canRocketUseChargedMove = this.#attemptChargedMove(this.right);

        this.#useFastMove(this.left, this.right);
        this.#useFastMove(this.right, this.left);

        // check win condition
        this.#checkWinCondition();

        if (this.winner) {
            console.log('CONGRATULATIONS ' + this.winner.trainer.name);
            console.log(TypeEffectiveness._);
        }
    }

    #attemptChargedMove(side) {
        return false; // TODO
    }

    #useFastMove(attacker, defender) {
        // can attack only if not on cooldown
        const move = this.pokedex.moves[attacker.pokemon.moves.fast];
        if (this.turn >= move.turns + attacker.last) {
            // charge energy and deal damage
            attacker.energy += move.energy;
            const damage = this.#damageFormula(move, attacker, defender);
            defender.HP -= damage.amount;

            attacker.last = this.turn;

            // add to log
            const entry = new LogEntry(this.turn, ENTRY_FAST_MOVE);
            const eff = damage.eff == 1 ? '' : (damage.eff > 1 ? 'It\'s supereffective!' : 'It\'s not very effective!');
            entry.data.text = `${attacker.pokemon.name} used ${move.id} (${damage.amount} damage). ${eff}`;
            entry.data.left = (attacker == this.left);
            entry.data.eff = damage.eff;
            this.log.push(entry);
        }
    }

    #checkWinCondition() {
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

    #damageFormula(move, attacker, defender) {
        // 1 + (0.5 * power * atk/def * STAB * eff)

        const attack = this.pokedex.templates[attacker.pokemon.name].stats.attack;
        const defense = this.pokedex.templates[defender.pokemon.name].stats.defense;
        
        const attackerTypes = this.pokedex.templates[attacker.pokemon.name].types;
        const STAB = attackerTypes.indexOf(move.type) < 0 ? 1 : 1.2;
        
        var eff = 1;
        const typeEffectiveness = TypeEffectiveness._[move.type.substring(13)];
        const defenderTypes = this.pokedex.templates[defender.pokemon.name].types;
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
    turn;
    type;
    data = {
        text: "",
        left: false
    };

    constructor(turn, type) {
        this.turn = turn;
        this.type = type;
    }
}

class TrainerState {
    trainer;
    team = [];

    dead = 0;

    constructor(trainer) {
        this.trainer = trainer;
        this.team.push(new PokemonState(trainer.team[0]));
        this.team.push(new PokemonState(trainer.team[1]));
        this.team.push(new PokemonState(trainer.team[2]));
    }
}

class PokemonState {
    pokemon;

    // current HP and charged energy
    HP;
    energy = 0;

    last = -10;

    constructor(pokemon) {
        this.pokemon = pokemon;

        // round down for actual HP
        this.HP = Math.floor(pokemon.HP);
    }
}

class Turn {
    index;
    constructor(index) {
        this.index = index;
    }
}

class Action {
    trainer;
    pokemon;
    constructor(trainer, pokemon) {
        this.trainer = trainer;
        this.pokemon = pokemon;
    }
}

export default Battle;