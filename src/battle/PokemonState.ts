import Pokemon from "../model/Pokemon";

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

export default PokemonState;
