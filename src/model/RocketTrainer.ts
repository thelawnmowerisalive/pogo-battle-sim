import Pokemon from "./Pokemon";
import PokemonTemplate from "./PokemonTemplate";
import Stats from "./Stats";
import Trainer from "./Trainer";

class RocketTrainer extends Trainer {
    rank: number;

    constructor(name: string, level: number, rank: number = 1) {
        super(name, level);
        this.rank = rank;

        this.strategy.shields = "never";
    }

    train(base: PokemonTemplate, {
        level,
        ivs,
        moves
    }: Partial<Pokemon>): Pokemon {
        // ivs for rockets are as follows:
        // attack = floor(2/3 * base atk + 25)
        // defense = 15
        // stamina = 15
        const pokemon = super.train(base, {
            level: this.level,
            ivs: new Stats(Math.floor(2 * base.stats.attack / 3 + 25), 15, 15),
            moves
        });
        // HP has a special formula, so we override it here
        pokemon.HP = Math.floor(Trainer.calcBaseStat(base, pokemon.ivs, 'stamina', 0.6)) * this.getMultiplier(this.level);
        
        // recalc CP to account for the HP value
        pokemon.CP = Trainer.calcCP(pokemon);

        pokemon.shadow = true;
        return pokemon;
    }

    getMultiplier(level: number): number {
        return this.rank * rCPM[this.level - 8];
    }
}

const rCPM = [0.28, 0.34, 0.39, 0.445, 0.464, 0.508, 0.538, 0.575, 0.605, 0.647, 0.687, 0.725, 0.751, 0.794, 0.825, 0.854, 0.88, 0.906, 0.929, 0.948, 0.971, 0.996, 1.02, 1.04, 1.067, 1.09, 1.117, 1.14, 1.165, 1.187, 1.209, 1.23, 1.265, 1.27, 1.275, 1.28, 1.285, 1.29, 1.295, 1.3, 1.305, 1.31, 1.315];

export default RocketTrainer;