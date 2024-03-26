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
    constructor(type: ID, text: string= '') {
        this.type = type;
        this.text = text;
    }
}

enum ID {
    NIL,
    SWITCH_IN,
    FAST_MOVE,
    CHARGED_MOVE,
    CHARGING,
    SHIELDING,
    FAINTED
}

export default Turn;

export { Side, ID };