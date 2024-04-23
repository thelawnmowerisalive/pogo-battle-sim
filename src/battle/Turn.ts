enum ID {
    NIL = "NIL",
    SWITCH_IN ="SWITCH_IN",
    FAST_MOVE = "FAST_MOVE",
    CHARGED_MOVE= "CHARGED_MOVE",
    CHARGING= "CHARGING",
    SHIELDING= "SHIELDING",
    FAINTED= "FAINTED"
}

class Turn {
    count: number;
    over: String;
    left: Side = new Side(ID.NIL);
    right: Side = new Side(ID.NIL);

    constructor(count: number, over: String = '') {
        this.count = count;
        this.over = over;
    }
}

class Side {
    type: ID;
    text: string;
    data: any = {};

    HP!: number[];
    energy!: number[];

    constructor(type: ID, text: string= '') {
        this.type = type;
        this.text = text;
    }
}

export default Turn;

export { Side, ID };