import React, { useState } from "react";
import { Button, Label, Popup } from "semantic-ui-react";
import Pokemon from "../model/Pokemon";

function ImportExportView({ pokemon, onImport }: {
  pokemon: Partial<Pokemon>,
  onImport: Function
}) {

  const handleExport = () => {
    navigator.clipboard.writeText(JSON.stringify(pokemon));
  }

  const handleImport = () => {
    navigator.clipboard.readText().then(text => {
      console.log(text);
      onImport(JSON.parse(text));
    });
  }

  const handleClose = () => {
  }

  return (
    <Label attached='top right' size="small" className="buttons">
      <Popup content={"Export"} onClose={handleClose}
        trigger={<Button icon="upload" disabled={!pokemon} onClick={handleExport} />}
      />
      <Popup content={"Import"} onClose={handleClose}
        trigger={<Button icon="download" disabled={!pokemon} onClick={handleImport} />}
      />
    </Label>
  )

}

export default ImportExportView;