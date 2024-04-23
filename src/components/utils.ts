import { DropdownItemProps, DropdownProps, InputOnChangeData } from "semantic-ui-react";
import NamedResource from "../model/NamedResource";
import Pokedex from "../model/Pokedex";

type Consumer<T> = (value: T) => void;
type Mapper<T> = (item: string) => T;

/**
 * Returns a mapper that uses the names from the dex for the text.
 * 
 * @param type of resource found in the dex
 * @returns 
 */
const translater = (type: 'pokemon' | 'types' | 'moves'): Mapper<DropdownItemProps> => {
  return (value: string) => {
    const resource: NamedResource = Pokedex.INSTANCE[type][value];
    return {
      key: value,
      value: value,
      text: resource ? resource.names.English : value
    }
  }
}

const stringToDropdownItemProps = (value: string): DropdownItemProps => {
  return {
    key: value,
    value: value,
    text: value
  }
}

/**
  * Returns a change handler that will call the setter function with the parsed value. 
  * 
  * @param setter function to update the state value
  * @param parser parses the value from the input to match the type of the state value
  * @returns a handler for the form input (takes the event and data)
  */
const handleInputChange = (setter: Function, parser: Function = (value: string) => { return value }) => {
  return (_event: any, { value }: InputOnChangeData) => {
    setter(parser(value));
  }
}

/**
 * Returns a change handler that will call the setter function.
 * 
 * @param setter function to update the state value
 * @returns a handler for the dropdown (takes the event and data)
 */
const handleDropdownChange = (setter: Function) => {
  return (_event: any, { value }: DropdownProps) => {
    setter(value);
  }
}

export { Consumer, Mapper, translater, handleDropdownChange, handleInputChange, stringToDropdownItemProps };
