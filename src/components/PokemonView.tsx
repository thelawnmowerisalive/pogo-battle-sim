import React, { useEffect, useReducer, useState } from "react";
import { DropdownItemProps, Form, FormDropdown, FormInput, Grid, InputOnChangeData, Segment, Statistic } from "semantic-ui-react";
import Moves from "../model/Moves";
import Pokedex from "../model/Pokedex";
import Pokemon from "../model/Pokemon";
import Stats from "../model/Stats";
import Trainer from "../model/Trainer";
import ImportExportView from "./ImportExportView";
import PokemonSelector from "./PokemonSelector";
import pokemonReducer, { ActionType } from "./pokemonReducer";
import { handleDropdownChange, handleInputChange, translater } from "./utils";

function PokemonView({ options, onChange }: {
  trainer: Trainer,
  options?: string[],
  onChange: Function
}) {

  const [state, dispatch] = useReducer(pokemonReducer, {
    name: "",
    level: 20,
    ivs: new Stats(15, 15, 15),
    moves: new Moves()
  });

  // populate the move selectors
  const [fastMoves, setFastMoves] = useState([] as DropdownItemProps[]);
  const [chargedMoves, setChargedMoves] = useState([] as DropdownItemProps[]);

  const setName = (name: string) => {
    // reset upon choosing a new pokemon
    dispatch({
      type: ActionType.FULL, payload: {
        name,
        level: 20,
        ivs: new Stats(15, 15, 15),
        moves: new Moves()
      }
    });
  }

  const setFastMove = (fast: string) => {
    dispatch({ type: ActionType.FAST_MOVE, payload: fast });
  }

  const setChargedMove = (charged: string) => {
    dispatch({ type: ActionType.CHARGED_MOVE, payload: charged });
  }

  const setIv = (attr: 'attack' | 'defense' | 'stamina') => {
    return (_event: any, { value }: InputOnChangeData) => {
      const ivs = new Stats(state.ivs?.attack || 0, state.ivs?.defense || 0, state.ivs?.stamina || 0);
      ivs[attr] = parseInt(value);
      dispatch({ type: ActionType.IVS, payload: ivs });
    }
  }

  const setLevel = (level: number) => {
    dispatch({ type: ActionType.LEVEL, payload: level });
  }

  const handleImport = (state: Partial<Pokemon>) => {
    dispatch({ type: ActionType.FULL, payload: state });
  }

  // if the name changes, we need to look in the pokedex and update 
  // the possible move selections
  useEffect(() => {
    if (!state.name) {
      return;
    }
    const pokemon = Pokedex.INSTANCE.pokemon[state.name];
    if (!pokemon) {
      // TODO show error
    } else {
      setFastMoves(
        pokemon.fastMoves.map(translater("moves")).concat(
          pokemon.eliteFastMoves.map(translater("moves")).map(item => {
            return {
              ...item,
              description: <i>legacy</i>,
              disabled: !!options // rocket pokemon can't have legacy moves
            }
          })));
      setChargedMoves(
        pokemon.chargedMoves.map(translater("moves")).concat(
          pokemon.eliteChargedMoves.map(translater("moves")).map(item => {
            return {
              ...item,
              description: <i>legacy</i>,
              disabled: !!options // rocket pokemon can't have legacy moves
            }
          })));

      // default to first move in list, if not already set (via import)
      if (!state.moves?.fast) {
        setFastMove(pokemon.fastMoves[0]);
      }
      if (!state.moves?.charged_1) {
        setChargedMove(pokemon.chargedMoves[0]);
      }
    }
  }, [state.name]);

  // once a pokemon is selected, train it and show the CP
  // which will depend on IVs and level
  if (state.name) {
    const trainedPokemon = onChange(state);
    const cp = Math.floor(trainedPokemon.CP);
    if (state.CP != cp) {
      dispatch({ type: ActionType.CP, payload: cp });
    }
  }

  return (
    <Segment>
      <ImportExportView pokemon={state} onImport={handleImport} />
      <Form size="mini">
        <Grid columns={2}>
          <Grid.Column>
            {
              options
                ? <PokemonSelector.FromOptions options={options} onChange={setName} />
                : <PokemonSelector.FromDex name={state.name} onChange={setName} />
            }
          </Grid.Column>
          <Grid.Column>
            <Statistic horizontal label="CP" value={state.CP} size="small"></Statistic>
          </Grid.Column>
        </Grid>

        <Grid columns={2}>
          <Grid.Column>
            <FormDropdown selection label="Fast Move" options={fastMoves} value={state.moves?.fast} onChange={handleDropdownChange(setFastMove)} />
          </Grid.Column>
          <Grid.Column>
            <FormDropdown selection label="Charged Move" options={chargedMoves} value={state.moves?.charged_1} onChange={handleDropdownChange(setChargedMove)} />
          </Grid.Column>
        </Grid>

        {/* only allow setting level and IVs if there are no predefined options */}
        {
          (!options) &&
          <>
            <Grid columns={15}>
              <Grid.Column width={3}>
                <FormInput label="Attack" type="number" min={1} max={15}
                  value={state.ivs?.attack} onChange={setIv('attack')} />
              </Grid.Column>
              <Grid.Column width={3}>
                <FormInput label="Defense" type="number" min={1} max={15}
                  value={state.ivs?.defense} onChange={setIv('defense')} />
              </Grid.Column>
              <Grid.Column width={3}>
                <FormInput label="HP" type="number" min={1} max={15}
                  value={state.ivs?.stamina} onChange={setIv('stamina')} />
              </Grid.Column>
              <Grid.Column width={6}>
                <FormInput label="Level" type="range" min={1} max={110}
                  value={state.level} onChange={handleInputChange(setLevel, parseInt)} />
              </Grid.Column>
            </Grid>
          </>
        }
      </Form>
    </Segment>
  )

}

export default PokemonView;