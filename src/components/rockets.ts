const GIOVANNI = "Giovanni";
const ARLO = "Arlo";
const CLIFF = "Cliff";
const SIERRA = "Sierra";

enum GRUNTS {
  NORMAL_M = "NORMAL_M",
  FIRE_F = "FIRE_F",
  WATER_F = "WATER_F",
  WATER_M = "WATER_M",
  ELECTRIC_F = "ELECTRIC_F",
  GRASS_M = "GRASS_M",
  ICE_F = "ICE_F",
  FIGHTING_F = "FIGHTING_F",
  POISON_F = "POISON_F",
  GROUND_M = "GROUND_M",
  FLYING_F = "FLYING_F",
  PSYCHIC_M = "PSYCHIC_M",
  BUG_M = "BUG_M",
  ROCK_M = "ROCK_M",
  GHOST_M = "GHOST_M",
  DRAGON_F = "DRAGON_F",
  DARK_F = "DARK_F",
  STEEL_M = "STEEL_M",
  FAIRY_F = "FAIRY_F",
  STARTERS_M = "STARTERS_M",
  SNORLAX_F = "SNORLAX_F",
  DECOY_F = "DECOY_F"
}

const getRocketMultiplier = (name: string): number => {
  switch (name) {
    case GIOVANNI:
      return 1.15;
    case ARLO:
    case CLIFF:
    case SIERRA:
      return 1.05;
    default:
      return 1;
  }
}

type Team = {
  slot_1: string[];
  slot_2: string[];
  slot_3: string[];
}

type Teams = {
  [key: string]: Team;
}

const teams: Teams = {
  [GIOVANNI]: {
    slot_1: ["PERSIAN"],
    slot_2: ["KINGDRA", "GARCHOMP", "RHYPERIOR"],
    slot_3: ["GROUDON"]
  },
  [ARLO]: {
    slot_1: ["CACNEA"],
    slot_2: ["CHARIZARD", "HYPNO", "GOLURK"],
    slot_3: ["DRAGONITE", "SCIZOR", "SALAMENCE"]
  },
  [CLIFF]: {
    slot_1: ["MACHOP"],
    slot_2: ["AERODACTYL", "KINGDRA", "GALLADE"],
    slot_3: ["CROBAT", "TYRANITAR", "CRADILY"]
  },
  [SIERRA]: {
    slot_1: ["TRAPINCH"],
    slot_2: ["SABLEYE", "MILOTIC", "HONCHKROW"],
    slot_3: ["ALAKAZAM", "VICTREEBEL", "HOUNDOOM"]
  },
  [GRUNTS.NORMAL_M]: {
    slot_1: ["TEDDIURSA", "STANTLER", "GLAMEOW"],
    slot_2: ["RATTATA", "MEOWTH", "PURRUGLY"],
    slot_3: ["URSALUNA", "STANTLER", "BIBAREL"]
  },
  [GRUNTS.FIRE_F]: {
    slot_1: ["CHIMCHAR", "DARUMAKA"],
    slot_2: ["HOUNDOOM", "MONFERNO"],
    slot_3: ["HOUNDOOM", "INFERNAPE", "DARMANITAN"]
  },
  [GRUNTS.WATER_F]: {
    slot_1: ["TOTODILE", "PIPLUP"],
    slot_2: ["CRAWDAUNT", "PRINPLUP"],
    slot_3: ["WAILORD", "WHISCASH", "EMPOLEON"]
  },
  [GRUNTS.WATER_M]: {
    slot_1: ["MAGIKARP"],
    slot_2: ["MAGIKARP"],
    slot_3: ["MAGIKARP", "GYARADOS"]
  },
  [GRUNTS.ELECTRIC_F]: {
    slot_1: ["MAREEP", "BLITZLE", "JOLTIK"],
    slot_2: ["GEODUDE_ALOLA", "ELECTRODE", "ELECTABUZZ"],
    slot_3: ["AMPHAROS", "LUXRAY", "GALVANTULA"]
  },
  [GRUNTS.GRASS_M]: {
    slot_1: ["TURTWIG", "SNOVER"],
    slot_2: ["GROTLE", "FERROTHORN"],
    slot_3: ["MEGANIUM", "CACTURNE", "TORTERRA"]
  },
  [GRUNTS.ICE_F]: {
    slot_1: ["SWINUB", "SNORUNT"],
    slot_2: ["NINETALES_ALOLA", "GLALIE", "FROSLASS"],
    slot_3: ["GLALIE", "ABOMASNOW", "FROSLASS"]
  },
  [GRUNTS.FIGHTING_F]: {
    slot_1: ["MACHOP", "SNEASEL_HISUI", "MAKUHITA"],
    slot_2: ["HITMONLEE", "HITMONCHAN", "HITMONTOP"],
    slot_3: ["MACHAMP", "INFERNAPE", "TOXICROAK"]
  },
  [GRUNTS.POISON_F]: {
    slot_1: ["SNEASEL_HISUI", "FOONGUS"],
    slot_2: ["NIDORINA", "NIDORINO"],
    slot_3: ["WEEZING", "TOXICROAK", "AMOONGUS"]
  },
  [GRUNTS.GROUND_M]: {
    slot_1: ["DIGLETT_ALOLA", "WOOPER", "DRILBUR"],
    slot_2: ["RHYHORN"],
    slot_3: ["QUAGSIRE", "WHISCASH", "TORTERRA"]
  },
  [GRUNTS.FLYING_F]: {
    slot_1: ["PIDGEY", "STARLY"],
    slot_2: ["GLIGAR", "STARAVIA"],
    slot_3: ["PIDGEOT", "DRAGONITE", "SKARMORY"]
  },
  [GRUNTS.PSYCHIC_M]: {
    slot_1: ["GOTHITA", "SOLOSIS"],
    slot_2: ["WOBBUFET", "RALTS", "GOTHORITA"],
    slot_3: ["METAGROSS", "GALLADE", "REUNICLUS"]
  },
  [GRUNTS.BUG_M]: {
    slot_1: ["SCYTHER", "SCHUCKLE", "DWEBBLE"],
    slot_2: ["WEEDLE", "SHUCKLE", "SKORUPI"],
    slot_3: ["BEEDRIL", "FORRETRESS", "SCIZOR"]
  },
  [GRUNTS.ROCK_M]: {
    slot_1: ["ONIX", "CRANIDOS", "SHIELDON"],
    slot_2: ["GRAVELER", "LILEEP", "ANORITH"],
    slot_3: ["GOLEM", "RAMPARDOS", "BASTIODON"]
  },
  [GRUNTS.GHOST_M]: {
    slot_1: ["MISDREAVUS", "DRIFLOON", "GOLETT"],
    slot_2: ["BANETTE", "DUSCLOPS", "GOLETT"],
    slot_3: ["GENGAR", "MAROWAK_ALOLA", "FROSLASS"]
  },
  [GRUNTS.DRAGON_F]: {
    slot_1: ["DRATINI", "BAGON", "GIBLE"],
    slot_2: ["EXEGGUTOR_ALOLA", "DRAGONAIR", "GABITE"],
    slot_3: ["DRAGONITE", "SALAMENCE", "GARCHOMP"]
  },
  [GRUNTS.DARK_F]: {
    slot_1: ["RATTATA_ALOLA", "HOUNDOUR", "STUNKY"],
    slot_2: ["RATICATE_ALOLA", "MUK_ALOLA"],
    slot_3: ["MUK_ALOLA", "SKUNTANK"]
  },
  [GRUNTS.STEEL_M]: {
    slot_1: ["SANDSHREW_ALOLA", "SKARMORY", "FERROSEED"],
    slot_2: ["SKARMORY", "LAIRON", "METANG"],
    slot_3: ["SANDSLASH_ALOLA", "SCIZOR", "EMPOLEON"]
  },
  [GRUNTS.FAIRY_F]: {
    slot_1: ["VULPIX_ALOLA", "RALTS", "MAWILE"],
    slot_2: ["SNUBBULL", "GRANBULL", "KIRLIA"],
    slot_3: ["NINETALES_ALOLA", "GRANBULL", "GARDEVOIR"]
  },
  [GRUNTS.STARTERS_M]: {
    slot_1: ["TREECKO", "TORCHIC", "MUDKIP"],
    slot_2: ["GROVYLE", "COMBUSKEN", "MARSHTOMP"],
    slot_3: ["SCEPTILE", "BLAZIEKN", "SWAMPERT"]
  },
  [GRUNTS.SNORLAX_F]: {
    slot_1: ["SNORLAX"],
    slot_2: ["POLIWRATH", "SNORLAX", "GARDEVOIR"],
    slot_3: ["GYARADOS", "SNORLAX", "DRAGONITE"]
  },
  [GRUNTS.DECOY_F]: {
    slot_1: ["BELLSPROUT"],
    slot_2: ["RATICATE", "WEEPINBELL"],
    slot_3: ["RATICATE", "SNORLAX"]
  },
  
}

const getRocketLineup = (name: string): Team => {
  return teams[name];
}

const ROCKETS: string[] = [
  GIOVANNI,
  ARLO, CLIFF, SIERRA];

export {
  getRocketMultiplier,
  getRocketLineup,
  ROCKETS,
  GIOVANNI,
  ARLO, CLIFF, SIERRA,
  GRUNTS
};