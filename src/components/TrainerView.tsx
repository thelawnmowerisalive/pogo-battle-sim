import React, { useEffect, useState } from "react";
import { FormInput, Grid, Input, Segment, SegmentGroup } from "semantic-ui-react";
import Pokemon from "../model/Pokemon";
import Trainer from "../model/Trainer";
import PokemonView from "./PokemonView";
import { handleInputChange } from "./utils";

function TrainerView({ trainer, onChange }: { trainer: Trainer, onChange: Function }) {
  const [name, setName] = useState(trainer.name);
  const [level, setLevel] = useState(trainer.level);

  useEffect(() => {
    // when input values change, update the parent
    trainer.name = name;
    trainer.level = level;
    onChange(trainer);
  }, [name, level]);

  const handlePokemonChange = (index: number): Function => {
    return (pokemon: Pokemon) => {
      trainer.team[index] = pokemon;
      onChange(trainer);
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column>
          <FormInput fluid label="Name" value={name} onChange={handleInputChange(setName)} />
        </Grid.Column>
        <Grid.Column>
          <FormInput fluid label="Level" value={level} type="number" min={8} max={50} onChange={handleInputChange(setLevel, parseInt)} />
        </Grid.Column>
      </Grid>

      <SegmentGroup>
        <PokemonView trainer={trainer} maxLevel={level} onChange={handlePokemonChange(0)} />
        <PokemonView trainer={trainer} maxLevel={level} onChange={handlePokemonChange(1)} />
        <PokemonView trainer={trainer} maxLevel={level} onChange={handlePokemonChange(2)} />
      </SegmentGroup>
    </>
  )

}

export default TrainerView;