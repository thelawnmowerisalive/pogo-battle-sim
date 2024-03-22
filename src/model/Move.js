import NamedResource from "./NamedResource";

class Move extends NamedResource{
    type;
    energy;
    power;
    turns;
    buffs;

    constructor(object) {
        super();
        Object.assign(this, object);
    }
}

export default Move;