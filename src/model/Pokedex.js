import Move from "./Move";
import PokemonTemplate from "./PokemonTemplate";
import Type from "./Type";

class Pokedex {
    templates = {};
    types = {};
    moves = {};

    add({
        formId, names, stats,
        primaryType, secondaryType,
        quickMoves, cinematicMoves, eliteQuickMoves, eliteCinematicMoves,
        regionForms
    }) {
        const pokemonTemplate = new PokemonTemplate({ id:formId, names, stats });

        // types
        primaryType && pokemonTemplate.types.push(this.#addType(primaryType));
        secondaryType && pokemonTemplate.types.push(this.#addType(secondaryType));

        // moves
        this.#createAndAddMoves(quickMoves, pokemonTemplate.fastMoves);
        this.#createAndAddMoves(cinematicMoves, pokemonTemplate.chargedMoves);
        this.#createAndAddMoves(eliteQuickMoves, pokemonTemplate.eliteFastMoves);
        this.#createAndAddMoves(eliteCinematicMoves, pokemonTemplate.eliteChargedMoves);

        // add regional forms as separate templates
        for (let regionFormId in regionForms) {
            this.add(regionForms[regionFormId]);
        }

        // save in map
        this.templates[formId] = pokemonTemplate;

        return pokemonTemplate;
    }

    #addType({type, names}) {
        this.types[type] = new Type(type, names);
        return type;
    }

    #addMove({ id, names, type, energy, power, turns, buffs }) {
        this.moves[id] = new Move({ id, names, type, energy, power, turns, buffs });
        return id;
    }

    #createAndAddMoves(source, target) {
        for (let name in source) {
            let move = source[name];
            let { id, names } = move;
            let { energy, power, turns, buffs } = move.combat;
            target.push(this.#addMove(
                { id, names, type:move.type.type, energy, power, turns, buffs }
            ));
        }
    }
}

export default Pokedex;