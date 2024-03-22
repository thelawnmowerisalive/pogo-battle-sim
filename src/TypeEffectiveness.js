const BUG = 'BUG';
const DARK = 'DARK';
const DRAGON = 'DRAGON';
const ELECTRIC = 'ELECTRIC';
const FAIRY = 'FAIRY';
const FIGHTING = 'FIGHTING';
const FIRE = 'FIRE';
const FLYING = 'FLYING';
const GHOST = 'GHOST';
const GRASS = 'GRASS';
const GROUND = 'GROUND';
const ICE = 'ICE';
const NORMAL = 'NORMAL';
const POISON = 'POISON';
const PSYCHIC = 'PSYCHIC';
const ROCK = 'ROCK';
const STEEL = 'STEEL';
const WATER = 'WATER';

class TypeEffectiveness {
   
    superEffective;     // 1.6
    notVeryEffective;   // 0.625
    non;                // 0.391
    
    constructor(superEffective, notVeryEffective, non) {
        this.superEffective = superEffective;
        this.notVeryEffective = notVeryEffective;
        this.non = non;
    }

    multiplier(type) {
        if (this.superEffective.indexOf(type) >= 0) {
            return 1.6;
        } else if (this.notVeryEffective.indexOf(type) >= 0) {
            return 0.625;
        } else if (this.non.indexOf(type) >= 0) {
            return 0.391;
        }
        return 1;
    }

    static _ = {
        // BUG: new TypeEffectiveness(),
        
        DARK: new TypeEffectiveness([GHOST, PSYCHIC], [DARK, FAIRY, FIGHTING], []),
        FAIRY: new TypeEffectiveness([DARK, DRAGON, FIGHTING], [FIRE, POISON, STEEL], []),
        FIGHTING: new TypeEffectiveness([DARK, ICE, NORMAL, ROCK, STEEL], [BUG, FAIRY, FLYING, POISON, PSYCHIC], [GHOST]),
        NORMAL: new TypeEffectiveness([], [ROCK, STEEL], [GHOST]),
        ROCK: new TypeEffectiveness([BUG, FIRE, FLYING, ICE], [FIGHTING, GROUND, STEEL], []),
        
    }
}


export default TypeEffectiveness;