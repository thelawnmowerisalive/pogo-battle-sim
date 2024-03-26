import React from "react";
import PokemonState from "../battle/PokemonState";

function PokemonStateView({ state }: { state: PokemonState }) {

    return (
        <div className="pokemon-state">
            <div>NAME: {state.pokemon.name} ({Math.floor(state.pokemon.CP)} CP)</div>
            <div>HP: {state.HP}/{Math.floor(state.pokemon.HP)}</div>

            <div>STATS</div>
            <div>Attack: {state.pokemon.attack}</div>
            <div>Defense: {state.pokemon.defense}</div>
        </div>
    )
}

export default PokemonStateView;