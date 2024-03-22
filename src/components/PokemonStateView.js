function PokemonStateView({ state }) {

    return (
        <div className="pokemon-state">
            <div>NAME: {state.pokemon.name}</div>
            <div>HP: {state.HP}/{Math.floor(state.pokemon.HP)}</div>

            <div>STATS</div>
            <div>Attack: {state.pokemon.attack}</div>
            <div>Defense: {state.pokemon.defense}</div>
        </div>
    )
}

export default PokemonStateView;