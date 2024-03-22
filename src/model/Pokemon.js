class Pokemon {
    name;
    level;
    ivs;
    moves;

    attack;
    defense;
    HP;
    CP;

    shadow = false;
    purified = false; // TODO
    lucky = false; // TODO

    constructor(name, level, ivs, moves) {
        this.name = name;
        this.level = level;
        this.ivs = ivs || {};
        this.moves = moves || {};
    }
}

export default Pokemon;