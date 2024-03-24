import NamedResource from "./NamedResource";
import Names from "./Names";
import Stats from "./Stats";

class PokemonBase extends NamedResource {
    id: string;
    stats: Stats;
    types: string[] = [];
    fastMoves: string[] = [];
    chargedMoves: string[] = [];
    eliteFastMoves: string[] = [];
    eliteChargedMoves: string[] = [];

    constructor(id: string, names: Names, stats: Stats) {
        super(names);
        this.id = id;
        this.stats = stats;
    }
}

export default PokemonBase;