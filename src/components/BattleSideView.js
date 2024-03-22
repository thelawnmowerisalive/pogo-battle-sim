import { Timeline, TimelineEvent } from "react-event-timeline";
import BoltIcon from '@mui/icons-material/Bolt';
import PokemonStateView from "./PokemonStateView";

function BattleSideView({ battle, left }) {
    const trainer = left ? battle.trainer : battle.rocket;
    
    const events = [];
    var turn = 0;
    



    battle.log.forEach(entry => {
        if (left == entry.data.left) {
            // fill in time
            for (let i = turn + 1; i < entry.turn; i++) {
                events.push(
                    <TimelineEvent
                        key={i}
                        createdAt={'TURN: ' + i}
                        iconColor="LightGray"
                        icon={<></>}>
                        {'-'}
                    </TimelineEvent>
                );
            }

            const iconColor = entry.data.eff == 1 ? "Black" : (entry.data.eff > 1 ? 'Crimson' : 'DarkGray');
            events.push(
                <TimelineEvent
                    key={entry.turn}
                    createdAt={'TURN: ' + entry.turn}
                    iconColor={iconColor}
                    icon={<BoltIcon />}>
                    <div style={{ color: iconColor }}>{entry.data.text}</div>
                </TimelineEvent>
            );
            turn = entry.turn;
        }
    })


    return (
        <div>
            <Timeline>
                {events}
            </Timeline>
            <PokemonStateView state={trainer.team[0]} />
        </div>
    )
}

export default BattleSideView;