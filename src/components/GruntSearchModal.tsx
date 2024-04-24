import React, { ReactNode, useState } from "react";
import { Icon, Label, LabelProps, Modal } from "semantic-ui-react";
import { GRUNTS } from "./rockets";
import COLORS from "./typeColors";
import { Consumer } from "./utils";

const quotes = {
  [GRUNTS.NORMAL_M]: "Normal does not mean weak.",
  [GRUNTS.FIRE_F]: "Do you know how hot Pokémon fire breath can get?",
  [GRUNTS.WATER_F]: "These waters are treacherous!",
  [GRUNTS.WATER_M]: "These waters are treacherous!",
  [GRUNTS.ELECTRIC_F]: "Get ready to be shocked!",
  [GRUNTS.GRASS_M]: "Don't tangle with us!",
  [GRUNTS.ICE_F]: "You're gonna be frozen in your tracks. ",
  [GRUNTS.FIGHTING_F]: "This buff physique isn't just for show!",
  [GRUNTS.POISON_F]: "Coiled and ready to strike!",
  [GRUNTS.GROUND_M]: "You'll be defeated into the ground!",
  [GRUNTS.FLYING_F]: "Battle against my Flying-type Pokémon!",
  [GRUNTS.PSYCHIC_M]: "Are you scared of psychics that use unseen power?",
  [GRUNTS.BUG_M]: "Go, my super bug Pokémon!",
  [GRUNTS.ROCK_M]: "Let's rock and roll!",
  [GRUNTS.GHOST_M]: "Ke...ke...ke...ke...ke...ke!",
  [GRUNTS.DRAGON_F]: "ROAR! ...How'd that sound?",
  [GRUNTS.DARK_F]: "Wherever there is light, there is also shadow.",
  [GRUNTS.STEEL_M]: "You're no match for my iron will! ",
  [GRUNTS.FAIRY_F]: "Check out my cute Pokémon!",

  [GRUNTS.STARTERS_M]: ["Winning is for winners.", "Get ready to be defeated!", "Don't bother—I've already won."],
  [GRUNTS.SNORLAX_F]: ["Winning is for winners.", "Get ready to be defeated!", "Don't bother—I've already won."],
  [GRUNTS.DECOY_F]: "Fooled ya, twerp.",
}

function GruntSearchModal({ trigger, onSelect }: {
  trigger: ReactNode,
  onSelect: Consumer<string>
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (_event: any, {value}: LabelProps) => {
    onSelect(value);
    setOpen(false);
  }

  const items: any[] = [];
  for (let [key, value] of Object.entries(quotes)) {
    const type = key.substring(0, key.indexOf("_"));
    const icon: 'man' | 'woman' = key.endsWith("M") ? 'man' : 'woman';
    const strings = typeof (value) === 'string' ? [value] : value;
    strings.forEach(quote => {
      items.push(
        <Label
          as="a" onClick={handleSelect} value={key}
          style={{ backgroundColor: COLORS[type] }}>
          <Icon name={icon} />
          {quote}
        </Label>
      );
    });
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}>
      <Modal.Header>Select grunt by quote</Modal.Header>
      <Modal.Content scrolling className="grunts">
        {
          items
        }
      </Modal.Content>
    </Modal>
  )
}

export default GruntSearchModal;