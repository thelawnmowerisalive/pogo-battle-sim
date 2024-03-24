import Moves from "./Moves";
import Pokemon from "./Pokemon";
import PokemonBase from "./PokemonBase";
import PokemonMove from "./PokemonMove";
import Stats from "./Stats";
import Trainer from "./Trainer";

class RocketTrainer extends Trainer {
    rank: number;

    constructor(name:string, level: number, rank:number) {
        super(name, level);
        this.rank = rank;
    }

    add(base: PokemonBase) {
        // ivs for rockets are as follows:
        // attack = floor(2/3 * base atk + 25)
        // defense = 15
        // stamina = 9
        const ivs = new Stats(
            Math.floor((2 / 3) * base.stats.attack + 25),
            15,
            9
        );

        // randomize moveset
        const moves = Trainer.randomizeMoveset(base);

        const pokemon = new Pokemon(base.id, this.level, ivs, moves);
        pokemon.shadow = true;

        // stat = (base stat + IV) * stat multiplier * rCPM * rank
        const multiplier = this.rank * rCPM[this.level - 8];
        pokemon.attack = Trainer.calcBaseStat(base, ivs, 'attack', 2 * multiplier);
        pokemon.defense = Trainer.calcBaseStat(base, ivs, 'defense', 0.8 * multiplier);
        pokemon.HP = Trainer.calcBaseStat(base, ivs, 'stamina', 1.1 * multiplier);

        // cp is standard formula
        pokemon.CP = Trainer.calcCP(pokemon);

        this.team.push(pokemon);
    }
}

const rCPM = [0.36566746, 0.38413203, 0.40259659, 0.42106116, 0.43952573, 0.4579903, 0.47645487, 0.49491943, 0.513384, 0.53184857, 0.55031314, 0.56877771, 0.58724227, 0.60570684, 0.62417141, 0.64263598, 0.66110055, 0.67956512, 0.69802968, 0.71649425, 0.73495882, 0.75342339, 0.77188796, 0.79035252, 0.80881709, 0.82728166, 0.84574623, 0.8642108, 0.88267536, 0.90113993, 0.9196045, 0.93806907, 0.95653364, 0.96307086, 0.9671741, 0.97127734, 0.97538058, 0.97948381, 0.98358705, 0.98769029, 0.99179353, 0.99589676, 1];


export default RocketTrainer;