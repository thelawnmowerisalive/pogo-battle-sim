import React from "react";
import { Circle, Close, HexagonTwoTone, Loop, Square, SwipeOutlined } from "../../node_modules/@mui/icons-material/index";
import { Tooltip } from "../../node_modules/@mui/material/index";
import Battle from "../battle/Battle";
import { ID, Side } from "../battle/Turn";

function BattleSideView({ battle, left }: { battle: Battle, left: boolean }) {
    const trainer = left ? battle.trainer : battle.rocket;
    const pokemon = left ? battle.left : battle.right;

    const events: any[] = [];

    battle.log.forEach(turn => {
        const side: Side = left ? turn.left : turn.right;
        var icon = <div></div>

        if (side.type == ID.FAST_MOVE) {
            icon = <Square htmlColor={COLORS[side.data.type]} fontSize="inherit" />;
        } else if (side.type == ID.CHARGED_MOVE) {
            icon = <Circle htmlColor={COLORS[side.data.type]} fontSize="large" />;
        } else if (side.type == ID.CHARGING) {
            icon = <SwipeOutlined htmlColor="LightGray" fontSize="large" />
        } else if (side.type == ID.SHIELDING) {
            icon = <HexagonTwoTone htmlColor="Violet" fontSize="large" />;
        } else if (side.type == ID.SWITCH_IN) {
            icon = <Loop htmlColor="LightGray" fontSize="large" />;
        } else if (side.type == ID.FAINTED) {
            icon = <Close color="error" fontSize="large" />;
        }

        events.push(
            <td className="event" key={turn.count + '' + turn.over}>
                <Tooltip title={side.text}>
                    {icon}
                </Tooltip>

            </td>
        );
    });

    return (
        <tr className="battle-side">
            {events}
        </tr>
    )
}

const COLORS = {
    NONE: 'gray',
    BUG: '#91A119',
    DARK: '#624D4E',
    DRAGON: '#5060E1',
    ELECTRIC: '#FAC000',
    FAIRY: '#EF70EF',
    FIGHTING: '#FF8000',
    FIRE: '#E62829',
    FLYING: '#81B9EF',
    GHOST: '#704170',
    GRASS: '#3FA129',
    GROUND: '#915121',
    ICE: '#3DCEF3',
    NORMAL: '#9FA19F',
    POISON: '#9141CB',
    PSYCHIC: '#EF4179',
    ROCK: '#AFA981',
    STEEL: '#60A1B8',
    WATER: '#2980EF'
} as any;

export default BattleSideView;