import React, { useEffect, useState } from "react";
import { FormDropdown, FormField, Search, SearchProps } from "semantic-ui-react";
import Pokedex from "../model/Pokedex";
import { Consumer, handleDropdownChange, translater } from "./utils";

class PokemonSelector {

  /**
   * Allows selection from the entire dex.
   */
  static FromDex = ({ name, onChange }: { name: string | undefined, onChange: Consumer<string> }) => {

    const items: SearchProps[] = [];
    for (let name in Pokedex.INSTANCE.pokemon) {
      items.push({
        title: Pokedex.INSTANCE.pokemon[name].names.English,
        id: name
      });
    }

    const [result, setResult] = useState(name);
    useEffect(() => {
      console.log(name);
      setResult(name);
    }, [name]);

    const [results, setResults] = useState([] as SearchProps[]);

    const handleSearchChange = (event: any, { value }: SearchProps) => {
      setResult(value || "");
      if (!value) {
        // no search string, clear results
        setResults([]);
        return;
      }
      const results: SearchProps[] = [];
      const searchString = value.toLowerCase();
      items.forEach(item => {
        if (item.title.toLowerCase().startsWith(searchString)) {
          results.push(item);
        }
      });
      setResults(results);
    }

    const handleResultSelect = (event: any, { result }: SearchProps) => {
      // setResult(result.title);
      onChange(result.id);
    }

    return (
      <FormField fluid label="Name"
        control={Search}
        minCharacters={3}
        value={result}
        results={results}
        onSearchChange={handleSearchChange}
        onResultSelect={handleResultSelect}>
      </FormField>
    )
  }

  /**
   * Allows selection from a preset list of options.
   */
  static FromOptions = ({ options, onChange }: { options: string[], onChange: Consumer<string> }) => {
    const [name, setName] = useState(options[0]);

    // listen for option changes (from the parent) and auto-select the first option
    useEffect(() => {
      setName(options[0]);
    }, [options]);

    // listen for name changes to return the selected value to the parent
    useEffect(() => {
      onChange(name);
    }, [name]);

    return (
      <FormDropdown fluid label="Name"
        selection
        value={name}
        options={options.map(translater("pokemon"))}
        onChange={handleDropdownChange(setName)} />
    )
  }
}

export default PokemonSelector;