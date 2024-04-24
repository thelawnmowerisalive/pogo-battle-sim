import React from "react";
import { Icon, Popup, PopupProps } from "semantic-ui-react";
import Battle from "../battle/Battle";
import { ID, Side } from "../battle/Turn";
import COLORS from "./typeColors";
import { Consumer } from "./utils";

function BattleSideView({ battle, left, onEventSelection }: {
    battle: Battle,
    left?: boolean,
    onEventSelection: Consumer<string>
}) {
    const selectEvent = (_event: any, data: PopupProps) => {
        onEventSelection((data.trigger as any).key);
    }

    const events: any[] = [];

    battle.log.forEach(turn => {
        const side: Side = left ? turn.left : turn.right;
        var icon = <div></div>

        if (side.type === ID.FAST_MOVE) {
            icon = <Icon key={turn.count + '+' + turn.over} name="square" style={{ color: COLORS[side.data.type] }} size="small" />;
        } else if (side.type === ID.CHARGED_MOVE) {
            icon = <Icon key={turn.count + '+' + turn.over} name="circle" style={{ color: COLORS[side.data.type] }} size="large" />;
        } else if (side.type === ID.CHARGING) {
            icon = <Icon key={turn.count + '+' + turn.over} name="forward" color="grey" size="large" />;
        } else if (side.type === ID.SHIELDING) {
            icon = <Icon key={turn.count + '+' + turn.over} name="shield" color="pink" size="large" />;
        } else if (side.type === ID.SWITCH_IN) {
            icon = <Icon key={turn.count + '+' + turn.over} name="refresh" color="grey" size="large" />;
        } else if (side.type === ID.FAINTED) {
            icon = <Icon key={turn.count + '+' + turn.over} name="close" color="red" fontSize="large" />;
        }

        events.push(
            <td className="event" key={turn.count + '+' + turn.over}>
                <Popup content={side.text} disabled={!side.text} trigger={icon} onOpen={selectEvent}></Popup>
            </td>
        );
    });

    return (
        <tr className="battle-side">
            {events}
        </tr>
    )
}

export default BattleSideView;