import NamedResource from "./NamedResource";

class PokemonTemplate extends NamedResource {
    stats;
    types = [];
    fastMoves = [];
    chargedMoves = [];
    eliteFastMoves = [];
    eliteChargedMoves = [];

    constructor(object) {
        super();
        Object.assign(this, object);
    }
}

export default PokemonTemplate;