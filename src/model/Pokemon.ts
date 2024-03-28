import Moves from "./Moves";
import Stats from "./Stats";

class Pokemon {
    name: string;
    level: number;
    ivs: Stats;
    moves: Moves;

    shadow = false;
    purified = false; // TODO
    lucky = false; // TODO

    // based on ivs and base stats
    attack!: number;
    defense!: number;
    HP!: number;
    CP!: number;

    constructor(name: string, level: number, ivs: Stats, moves: Moves) {
        this.name = name;
        this.level = level;
        this.ivs = ivs;
        this.moves = moves;
    }
}

export default Pokemon;