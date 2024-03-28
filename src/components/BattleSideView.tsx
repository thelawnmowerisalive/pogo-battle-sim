import React from "react";
import { Icon, Popup } from "semantic-ui-react";
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
            icon = <Icon name="square" color={COLORS[side.data.type]} size="small" />;
        } else if (side.type == ID.CHARGED_MOVE) {
            icon = <Icon name="circle" color={COLORS[side.data.type]} size="large" />;
        } else if (side.type == ID.CHARGING) {
            // icon = <SwipeOutlined htmlColor="LightGray" fontSize="large" />
            <Icon.Group size='huge'>
                <Icon size='big' name='circle outline' />
                <Icon name='user' />
            </Icon.Group>
        } else if (side.type == ID.SHIELDING) {
            icon = <Icon name="shield" color="violet" size="large" />;
        } else if (side.type == ID.SWITCH_IN) {
            icon = <Icon name="refresh" color="grey" size="large" />;
        } else if (side.type == ID.FAINTED) {
            icon = <Icon name="close" color="red" fontSize="large" />;
        }

        events.push(
            <td className="event" key={turn.count + '' + turn.over}>
                <Popup content=""/>
                {/* <Tooltip title={side.text}>
                    {icon}
                </Tooltip> */}

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