import NamedResource from "./NamedResource";

class PokemonMove extends NamedResource {
    id!: string;
    type!: string;
    energy!: number;
    power!: number;
    turns!: number;
    buffs: any;

    constructor(object: any) {
        super(object.names);
        Object.assign(this, object);
    }
}

export default PokemonMove;