import { POKEDEX } from "../Constants";
import { getCachedData } from "../updateData";
import Names from "./Names";
import PokemonBase from "./PokemonBase";
import PokemonMove from "./PokemonMove";
import PokemonType from "./PokemonType";
import Stats from "./Stats";

type PokemonMap = {
    [key: string]: PokemonBase;
};

type TypeMap = {
    [key: string]: PokemonType;
}

type MoveMap = {
    [key: string]: PokemonMove;
}

class Pokedex {
    pokemon: PokemonMap = {};
    types: TypeMap = {};
    moves: MoveMap = {};

    ready: boolean = false;

    static INSTANCE: Pokedex;

    private constructor() { }

    static async initialize(): Promise<boolean> {
        if (!this.INSTANCE) {
            // initialize
            this.INSTANCE = new Pokedex();
            for (let pokemon of await getCachedData(POKEDEX)) {
                this.INSTANCE.add(pokemon);
            }
            this.INSTANCE.ready = true;
        }
        return this.INSTANCE.ready;
    }

    add({
        formId, names, stats,
        primaryType, secondaryType,
        quickMoves, cinematicMoves, eliteQuickMoves, eliteCinematicMoves,
        regionForms
    }: {
        formId: string,
        names: Names,
        stats: Stats,
        primaryType: PokemonType,
        secondaryType: PokemonType,
        quickMoves: [],
        cinematicMoves: [],
        eliteQuickMoves: [],
        eliteCinematicMoves: [],
        regionForms: any
    }) {
        const pokemon = new PokemonBase(formId, names, stats);

        // types
        primaryType && pokemon.types.push(this.addType(primaryType));
        secondaryType && pokemon.types.push(this.addType(secondaryType));

        // moves
        this.createAndAddMoves(quickMoves, pokemon.fastMoves);
        this.createAndAddMoves(cinematicMoves, pokemon.chargedMoves);
        this.createAndAddMoves(eliteQuickMoves, pokemon.eliteFastMoves);
        this.createAndAddMoves(eliteCinematicMoves, pokemon.eliteChargedMoves);

        // add regional forms separately
        for (let regionFormId in regionForms) {
            this.add(regionForms[regionFormId]);
        }

        // save in map
        this.pokemon[formId] = pokemon;

        return pokemon;
    }

    private addType({ type, names }: PokemonType): string {
        this.types[type] = new PokemonType(type, names);
        return type;
    }

    private addMove({ id, names, type, energy, power, turns, buffs }: any): string {
        this.moves[id] = new PokemonMove({ id, names, type, energy, power, turns, buffs });
        return id;
    }

    private createAndAddMoves(source: any[], target: string[]) {
        for (let name in source) {
            let move = source[name];
            let { id, names } = move;
            let { energy, power, turns, buffs } = move.combat;
            target.push(this.addMove(
                { id, names, type: move.type.type, energy, power, turns, buffs }
            ));
        }
    }
}

export default Pokedex;