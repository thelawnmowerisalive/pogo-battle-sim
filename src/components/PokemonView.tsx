import React, { useEffect, useState } from "react";
import { DropdownItemProps, Form, FormDropdown, FormInput, Grid, InputOnChangeData, Segment } from "semantic-ui-react";
import Pokedex from "../model/Pokedex";
import Stats from "../model/Stats";
import Trainer from "../model/Trainer";
import PokemonSelector from "./PokemonSelector";
import { handleDropdownChange, handleInputChange, stringToDropdownItemProps } from "./utils";

function PokemonView({ trainer, maxLevel, options, onChange }: {
  trainer: Trainer,
  maxLevel?: number,
  options?: string[],
  onChange: Function
}) {

  // user input
  const [name, setName] = useState("");
  const [level, setLevel] = useState(8); // because of the stepper, it will be double
  const [appraisal, setAppraisal] = useState(new Stats(8, 8, 8));
  const [fastMove, setFastMove] = useState("");
  const [chargedMove, setChargedMove] = useState("");

  // populate the move selectors
  const [fastMoves, setFastMoves] = useState([] as DropdownItemProps[]);
  const [chargedMoves, setChargedMoves] = useState([] as DropdownItemProps[]);

  // listen for name change to update move selectors
  useEffect(() => {
    if (!name) {
      // no selection
      return;
    }
    const pokemon = Pokedex.INSTANCE.pokemon[name];
    if (!pokemon) {
      // TODO show error
      return;
    }

    setFastMoves(pokemon.fastMoves.concat(pokemon.eliteFastMoves).map(stringToDropdownItemProps));
    setChargedMoves(pokemon.chargedMoves.concat(pokemon.eliteChargedMoves).map(stringToDropdownItemProps));

    setFastMove(pokemon.fastMoves[0]);
    setChargedMove(pokemon.chargedMoves[0]);
  }, [name]);

  const handleIvChange = (attr: 'attack' | 'defense' | 'stamina') => {
    return (event: any, { value }: InputOnChangeData) => {
      const stats = new Stats(appraisal.attack, appraisal.defense, appraisal.stamina);
      (stats as any)[attr] = parseInt(value);
      setAppraisal(stats);
    }
  }

  // derived from user input
  const [CP, setCp] = useState(0);
  useEffect(() => {
    if (!name) {
      return;
    }
    const pokemon = trainer.train(Pokedex.INSTANCE.pokemon[name], {
      level: level / 2,
      ivs: appraisal,
      moves: { fast: fastMove, charged_1: chargedMove }
    });
    setCp(Math.floor(pokemon.CP));
  }, [name, level, appraisal]);

  return (
    <Segment>
      <Form size="mini">
        <Grid columns={2}>
          <Grid.Column>
            {
              options
                ? <PokemonSelector.FromOptions options={options} onChange={setName} />
                : <PokemonSelector.FromDex onChange={setName} />
            }
          </Grid.Column>
          <Grid.Column>
            CP {CP}
          </Grid.Column>
        </Grid>

        {
          (!options) &&
          <>
            <Grid columns={15}>
              <Grid.Column width={3}>
                <FormInput label="Attack" type="number" min={1} max={15}
                  value={appraisal.attack} onChange={handleIvChange('attack')} />
              </Grid.Column>
              <Grid.Column width={3}>
                <FormInput label="Defense" type="number" min={1} max={15}
                  value={appraisal.defense} onChange={handleIvChange('defense')} />
              </Grid.Column>
              <Grid.Column width={3}>
                <FormInput label="HP" type="number" min={1} max={15}
                  value={appraisal.stamina} onChange={handleIvChange('stamina')} />
              </Grid.Column>
              <Grid.Column width={6}>
                <FormInput label="Level" type="range" min={1} max={2 * trainer.level} 
                  value={level} onChange={handleInputChange(setLevel, parseInt)} />
              </Grid.Column>
            </Grid>
          </>
        }

        <Grid columns={2}>
          <Grid.Column>
            <FormDropdown selection label="Fast Move" options={fastMoves} value={fastMove} onChange={handleDropdownChange(setFastMove)} />
          </Grid.Column>
          <Grid.Column>
            <FormDropdown selection label="Charged Move" options={chargedMoves} value={chargedMove} onChange={handleDropdownChange(setChargedMove)} />
          </Grid.Column>
        </Grid>
      </Form>

    </Segment>
  )

}

export default PokemonView;