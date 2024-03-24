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

const types = [BUG, DARK, DRAGON, ELECTRIC, FAIRY, FIGHTING, FIRE, FLYING, GHOST, GRASS, GROUND, ICE, NORMAL, POISON, PSYCHIC, ROCK, STEEL, WATER];

class TypeEffectiveness {
   
    superEffective: string[];     // 1.6
    notVeryEffective: string[];   // 0.625
    non: string[];                // 0.391
    
    constructor(superEffective: string[], notVeryEffective: string[], non: string[]) {
        this.superEffective = superEffective;
        this.notVeryEffective = notVeryEffective;
        this.non = non;
    }

    multiplier(type: string) {
        if (this.superEffective.indexOf(type) >= 0) {
            return 1.6;
        } else if (this.notVeryEffective.indexOf(type) >= 0) {
            return 0.625;
        } else if (this.non.indexOf(type) >= 0) {
            return 0.391;
        }
        return 1;
    }

    static get(type: string) {
        return (TypeEffectiveness._ as any)[type];
    }

    private static _ = {
        // BUG: new TypeEffectiveness(),
        
        DARK: new TypeEffectiveness([GHOST, PSYCHIC], [DARK, FAIRY, FIGHTING], []),
        FAIRY: new TypeEffectiveness([DARK, DRAGON, FIGHTING], [FIRE, POISON, STEEL], []),
        FIGHTING: new TypeEffectiveness([DARK, ICE, NORMAL, ROCK, STEEL], [BUG, FAIRY, FLYING, POISON, PSYCHIC], [GHOST]),
        NORMAL: new TypeEffectiveness([], [ROCK, STEEL], [GHOST]),
        ROCK: new TypeEffectiveness([BUG, FIRE, FLYING, ICE], [FIGHTING, GROUND, STEEL], []),
        
    }
}


export default TypeEffectiveness;