import { DropdownItemProps, DropdownProps, InputOnChangeData } from "semantic-ui-react";

const stringToDropdownItemProps = (value: string): DropdownItemProps => {
  return {
    key: value,
    value: value,
    text: value
  }
}

/**
  * Returns a change handler that will call the setter function. 
  * 
  * @param setter function to update the state value
  * @param parser parses the value from the input to match the type of the state value
  * @returns a handler for the form input (takes the event and data)
  */
const handleInputChange = (setter: Function, parser: Function = (value: string) => { return value }) => {
  return (event: any, { value }: InputOnChangeData) => {
    setter(parser(value));
  }
}

const handleDropdownChange = (setter: Function) => {
  return (event: any, { value }: DropdownProps) => {
    setter(value);
  }
}

export { stringToDropdownItemProps, handleInputChange, handleDropdownChange };