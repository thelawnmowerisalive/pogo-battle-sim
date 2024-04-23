import React from "react";
import { List, Segment } from "semantic-ui-react";

function InstructionsView() {
  return (
    <Segment className="instructions">
      <List ordered>
        <List.Item>In each slot, select a Pokemon from the list.</List.Item>
        <List.Item>Select a fast move and a charged move.</List.Item>
        <List.Item>Adjust the IVs (according to your team leader's appraisal) and level, until the CP matches your Pokemon (or is as close as possible).</List.Item>
        <List.Item>Select the Team Rocket member; you can also adjust their team to experiment, or to match the one you encounter in your game.</List.Item>
      </List>
    </Segment>
  )
}

export default InstructionsView;