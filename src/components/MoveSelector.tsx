import { DropdownItemProps, FormDropdown } from "semantic-ui-react";
import { Consumer, handleDropdownChange, translater } from "./utils";
import React, { useEffect, useState } from "react";

function MoveSelector({ label, moves, eliteMoves, onChange }: {
  label: string,
  moves: string[],
  eliteMoves: string[],
  onChange: Consumer<string>
}) {

  const [options] = useState(
    moves.map(translater('moves'))
      .concat(eliteMoves.map(translater('moves')))
  );
  const [move, setMove] = useState(options[0].value as string);

  useEffect(() => {
    onChange(move);
  }, [move]);

  return (
    <FormDropdown selection label={label}
      options={options}
      value={move}
      onChange={handleDropdownChange(setMove)}
    />
  )

}

export default MoveSelector;