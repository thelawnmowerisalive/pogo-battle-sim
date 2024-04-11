const GIOVANNI = "Giovanni";
const ARLO = "Arlo";
const CLIFF = "Cliff";
const SIERRA = "Sierra";

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
  }
}

const getRocketLineup = (name: string): Team => {
  return teams[name];
}

const ROCKETS: string[] = [GIOVANNI, ARLO, CLIFF, SIERRA];

export {
  getRocketMultiplier,
  getRocketLineup,
  ROCKETS
};