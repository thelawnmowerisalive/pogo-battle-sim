import React, { useEffect, useState } from "react";
import { FormDropdown, SegmentGroup } from "semantic-ui-react";
import Pokemon from "../model/Pokemon";
import Trainer from "../model/Trainer";
import PokemonView from "./PokemonView";
import { handleDropdownChange, stringToDropdownItemProps } from "./utils";
import Stats from "../model/Stats";

const GIOVANNI = "Giovanni";
const ARLO = "Arlo";
const CLIFF = "Cliff";
const SIERRA = "Sierra";

const rockets: string[] = [GIOVANNI, ARLO, CLIFF, SIERRA];

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

function RocketTrainerView({ trainer, onChange }: { trainer: Trainer, onChange: Function }) {

  const [name, setName] = useState(trainer.name);
  const [team, setTeam] = useState(teams[trainer.name]);

  useEffect(() => {
    trainer.name = name;
    setTeam(teams[trainer.name]);
    onChange(trainer);
  }, [name]);

  const handlePokemonChange = (index: number): Function => {
    return (pokemon: Pokemon) => {
      trainer.team[index] = pokemon;
      onChange(trainer);
    }
  }

  return (
    <>
      <FormDropdown selection label="Name"
        options={rockets.map(stringToDropdownItemProps)}
        value={trainer.name}
        onChange={handleDropdownChange(setName)} />

      <SegmentGroup>
        <PokemonView trainer={trainer} options={team.slot_1} onChange={handlePokemonChange(0)} />
        <PokemonView trainer={trainer} options={team.slot_2} onChange={handlePokemonChange(1)} />
        <PokemonView trainer={trainer} options={team.slot_3} onChange={handlePokemonChange(2)} />
      </SegmentGroup>
    </>
  )

}

export default RocketTrainerView;