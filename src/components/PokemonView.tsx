import React, { useCallback, useEffect, useReducer, useState } from "react";
import { DropdownItemProps, Form, FormDropdown, FormInput, Grid, Icon, InputOnChangeData, Segment, Statistic } from "semantic-ui-react";
import Moves from "../model/Moves";
import Pokedex from "../model/Pokedex";
import Pokemon from "../model/Pokemon";
import PokemonTemplate from "../model/PokemonTemplate";
import Stats from "../model/Stats";
import ImportExportView from "./ImportExportView";
import PokemonSelector from "./PokemonSelector";
import pokemonReducer, { ActionType } from "./pokemonReducer";
import { handleDropdownChange, handleInputChange, translater } from "./utils";

const defaults = {
  level: 20,
  ivs: new Stats(15, 15, 15),
  moves: new Moves()
}

function PokemonView({ options, onChange }: {
  options?: string[],
  onChange: Function
}) {

  const [state, dispatch] = useReducer(pokemonReducer, defaults);

  const setName = (name: string) => {
    // reset upon choosing a new pokemon
    dispatch({
      type: ActionType.FULL, payload: { name, ...defaults }
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

  // populate the move selectors
  const [fastMoves, setFastMoves] = useState([] as DropdownItemProps[]);
  const [chargedMoves, setChargedMoves] = useState([] as DropdownItemProps[]);

  const hasOptions = !!options;
  const updateMoveSelectors = useCallback((pokemon: PokemonTemplate) => {
    const mapper = (legacy: boolean) => {
      return (item: DropdownItemProps) => {
        const move = Pokedex.INSTANCE.moves[item.key];
        const text = item.text + (legacy ? " *" : "");
        let description;
        if (move.energy < 0) {
          // charged move, show required energy
          description = <span>{-move.energy}<Icon name="lightning" size="small" /></span>;
        } else {
          // fast move, show EPS (1 turn is 0.5 seconds)
          const eps = 2 * move.energy / move.turns;
          description = <span>{Math.floor(eps) === eps ? eps : eps.toFixed(2)}<span className="eps">eps</span></span>
        }
        return {
          ...item,
          text,
          description,
          disabled: hasOptions && legacy // rocket pokemon can't have legacy moves
        }
      }
    }

    setFastMoves(
      pokemon.fastMoves.map(translater("moves")).map(mapper(false))
        .concat(pokemon.eliteFastMoves.map(translater("moves")).map(mapper(true))));
    setChargedMoves(
      pokemon.chargedMoves.map(translater("moves")).map(mapper(false))
        .concat(pokemon.eliteChargedMoves.map(translater("moves")).map(mapper(true))));

    if (hasOptions) {
      setFastMove(pokemon.fastMoves[0]);
    }
    if (hasOptions) {
      setChargedMove(pokemon.chargedMoves[0]);
    }
  }, [hasOptions]);

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
      updateMoveSelectors(pokemon);
    }
  }, [state.name, updateMoveSelectors]);

  // notify the trainer to update their team
  useEffect(() => {
    if (!state.name || !state.moves?.fast || !state.moves?.charged_1) {
      return;
    }
    const trainedPokemon = onChange(state);
    const cp = Math.floor(trainedPokemon.CP);
    if (state.CP !== cp) {
      dispatch({ type: ActionType.CP, payload: cp });
    }
  }, [state.name, state.level, state.ivs, state.moves]);

  return (
    <Segment>
      <Form size="mini">
        <Grid columns={2} verticalAlign="bottom">
          <Grid.Column>
            {
              options
                ? <PokemonSelector.FromOptions options={options} onChange={setName} />
                : <PokemonSelector.FromDex name={state.name} onChange={setName} />
            }
          </Grid.Column>
          <Grid.Column>
            <Statistic horizontal label="CP" value={state.CP} size="small" />
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
      {
        (!options) &&
        <ImportExportView pokemon={state} onImport={handleImport} />
      }
    </Segment>
  )

}

export default PokemonView;