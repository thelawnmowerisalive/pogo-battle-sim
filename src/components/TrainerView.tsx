import React from "react";
import { SegmentGroup } from "semantic-ui-react";
import Pokedex from "../model/Pokedex";
import Pokemon from "../model/Pokemon";
import Trainer from "../model/Trainer";
import PokemonView from "./PokemonView";
import { getRocketLineup } from "./rockets";

function TrainerView({ trainer, rocket }: { trainer: Trainer, rocket?: boolean }) {

  const lineup = rocket
    ? getRocketLineup(trainer.name)
    : { slot_1: undefined, slot_2: undefined, slot_3: undefined };

  const handlePokemonChange = (index: number): Function => {
    return (state: Pokemon) => {
      console.log(state);
      const pokemon = trainer.train(Pokedex.INSTANCE.pokemon[state.name], {
        level: (state.level || 0) / 2,
        ivs: state.ivs,
        moves: state.moves
      });
      trainer.team[index] = pokemon;
      return pokemon;
    }
  }

  return (
    <SegmentGroup className="team">
      <PokemonView trainer={trainer} options={lineup.slot_1} onChange={handlePokemonChange(0)} />
      <PokemonView trainer={trainer} options={lineup.slot_2} onChange={handlePokemonChange(1)} />
      <PokemonView trainer={trainer} options={lineup.slot_3} onChange={handlePokemonChange(2)} />
    </SegmentGroup>
  )

}

export default TrainerView;