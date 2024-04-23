import React, { ReactNode } from "react";
import { Icon, Progress, Segment, Statistic } from "semantic-ui-react";
import PokemonState from "../battle/PokemonState";
import TrainerState from "../battle/TrainerState";
import { Side } from "../battle/Turn";

function TeamStateView({ trainer, side }: {
    trainer: TrainerState,
    side: Side
}) {

    const segments: ReactNode[] = [];
    [0, 1, 2].forEach(index => {
        segments.push(<PokemonStateView key={index}
            state={trainer.team[index]}
            HP={side?.HP ? side.HP[index] : 0}
            energy={side?.energy ? side.energy[index] : 0} />);
    });
    return (
        <Segment.Group className="team" horizontal>
            {segments}
        </Segment.Group>
    )
}

function PokemonStateView({ state, HP, energy }: {
    state: PokemonState,
    HP: number,
    energy: number
}) {
    return (
        <Segment>
            <Statistic className="energy" size="mini" floated="right">
                <Statistic.Label>{energy}<Icon name="lightning" /></Statistic.Label>
            </Statistic>
            {state.pokemon.name}
            <Progress className="hp-bar"
                value={Math.max(0, HP)}
                total={Math.floor(state.pokemon.HP)}
                progress="ratio"
                indicating
                active={false} />
        </Segment>
    )
}

export default TeamStateView;