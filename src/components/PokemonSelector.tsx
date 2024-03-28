import React, { useEffect, useState } from "react";
import { Dropdown, FormDropdown, Search, SearchProps } from "semantic-ui-react";
import Pokedex from "../model/Pokedex";
import { handleDropdownChange, stringToDropdownItemProps } from "./utils";

type Result = { title: string; id: string; }

class PokemonSelector {

  /**
   * Allows selection from the entire dex.
   */
  static FromDex = ({ onChange }: { onChange: Function }) => {
    const items: Result[] = [];
    for (let name in Pokedex.INSTANCE.pokemon) {
      items.push({
        title: name,
        id: name
      });
    }

    const [results, setResults] = useState([] as Result[]);
    const handleSearchChange = (event: any, { value }: SearchProps) => {
      if (!value) {
        // no search string, clear results
        setResults([]);
        return;
      }
      const results: Result[] = [];
      const searchString = value.toLowerCase();
      items.forEach(item => {
        if (item.id.toLowerCase().startsWith(searchString)) {
          results.push(item);
        }
      });
      setResults(results);
    }

    const handleResultSelect = (event: any,  {result} : SearchProps) => {
      onChange((result as Result).id);
    }

    return (
      <Search
        fluid
        minCharacters={3}
        results={results}
        onSearchChange={handleSearchChange}
        onResultSelect={handleResultSelect} />
    )
  }

  /**
   * Allows selection from a preset list of options.
   */
  static FromOptions = ({ options, onChange }: { options: string[], onChange: Function }) => {
    const [name, setName] = useState(options[0]);
    useEffect(() => {
      onChange(name);
    }, [name]);
    useEffect(() => {
      setName(options[0]);
    }, [options]);

    return (
      <FormDropdown selection
        label="Name"
        value={name}
        options={options.map(stringToDropdownItemProps)}
        onChange={handleDropdownChange(setName)} />
    )
  }
}

export default PokemonSelector;