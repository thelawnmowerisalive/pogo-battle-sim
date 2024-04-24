import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, Form, FormDropdown, FormInput, Grid, Header, Icon, Segment } from "semantic-ui-react";
import Battle from "../battle/Battle";
import Turn from "../battle/Turn";
import Pokedex from "../model/Pokedex";
import RocketTrainer from "../model/RocketTrainer";
import Trainer from "../model/Trainer";
import BattleSideView from "./BattleSideView";
import GruntSearchModal from "./GruntSearchModal";
import InstructionsView from "./InstructionsView";
import TeamStateView from "./TeamStateView";
import TrainerView from "./TrainerView";
import { ARLO, CLIFF, GIOVANNI, SIERRA, getRocketMultiplier } from "./rockets";
import { handleDropdownItemClick, handleInputChange } from "./utils";

const defaults = {
    level: 42,
    trainer: 'Trainer',
    rocket: GIOVANNI
}

function BattleView() {
    // make sure the pokedex is ready
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!ready) {
            Pokedex.initialize().then((ready: boolean) => {
                setReady(ready);
            });
        }
    }, [ready]);

    // initialize battle with default values
    const [trainer] = useState(new Trainer(defaults.trainer, defaults.level));
    const [rocket, setRocket] = useState(new RocketTrainer(defaults.rocket, defaults.level, getRocketMultiplier(defaults.rocket)));

    const [battle, setBattle] = useState(undefined as unknown as Battle);
    const [turn, setTurn] = useState(undefined as unknown as Turn);

    const handleNameChange = (name: string) => {
        trainer.name = name;
    }

    const handleLevelChange = (level: number) => {
        // trainer level doesn't impact his pokemon's CP
        // we only set it for consistency
        trainer.level = level;

        // it DOES however impact the rocket's team
        setRocket(new RocketTrainer(rocket.name, level, getRocketMultiplier(rocket.name)))
    }

    const handleRocketChange = (name: string) => {
        setRocket(new RocketTrainer(name, rocket.level, getRocketMultiplier(name)));
    }

    const startBattle = () => {
        console.log(trainer);
        console.log(rocket);

        const x = new Battle(trainer, rocket);
        x.simulate();
        console.log(x);
        setBattle(x);
    }

    const handleEventSelection = (key: string) => {
        console.log(key);
        const turn = battle.getTurn(key);
        if (!turn) {
            return;
        }
        setTurn(turn);
    }

    const getRocketDropdownItem = (name: string) => {
        return <Dropdown.Item onClick={handleDropdownItemClick(handleRocketChange)} key={name} value={name}>{name}</Dropdown.Item>
    }

    const handleGruntSelect = (value: string) => {
        handleRocketChange(value);
    }

    return !ready ?
        <div>
            <Segment vertical>
                <Header icon textAlign="center">
                    <Icon name="setting" loading />
                    INITIALIZING...
                </Header>
            </Segment>
        </div> : (
            <Container>
                <Segment vertical>
                    <Header icon textAlign="center">
                        <Icon name="rocket" />
                        POGO BATTLE SIM
                    </Header>
                </Segment>
                {
                    battle ?
                        <>
                            <div className="battle">
                                <table>
                                    <tbody>
                                        <BattleSideView battle={battle} onEventSelection={handleEventSelection} left />
                                        <BattleSideView battle={battle} onEventSelection={handleEventSelection} />
                                    </tbody>
                                </table>
                            </div>
                            <Grid centered>
                                <Grid.Column widescreen={7}>
                                    <TeamStateView trainer={battle.trainer} side={turn?.left} />
                                </Grid.Column>
                                <Grid.Column widescreen={2} />
                                <Grid.Column widescreen={7}>
                                    <Grid.Column widescreen={7}>
                                        <TeamStateView trainer={battle.rocket} side={turn?.right} />
                                    </Grid.Column>
                                </Grid.Column>
                            </Grid>
                        </>
                        : <InstructionsView />
                }

                <Grid centered>
                    <Grid.Column widescreen={7}>
                        <TrainerView trainer={trainer} />
                    </Grid.Column>

                    <Grid.Column widescreen={2}>
                        <Form>
                            <FormInput fluid label="Name"
                                value={trainer.name}
                                onChange={handleInputChange(handleNameChange)} />
                            <FormInput fluid label="Level"
                                type="number" min={8} max={50}
                                value={trainer.level}
                                onChange={handleInputChange(handleLevelChange, parseInt)} />

                            <FormDropdown fluid label="Rocket"
                                selection
                                text={rocket.name}
                                value={rocket.name}>
                                <Dropdown.Menu>
                                    {getRocketDropdownItem(GIOVANNI)}
                                    <Dropdown.Divider />
                                    {getRocketDropdownItem(ARLO)}
                                    {getRocketDropdownItem(CLIFF)}
                                    {getRocketDropdownItem(SIERRA)}
                                    <Dropdown.Divider />
                                    <GruntSearchModal
                                        trigger={<Dropdown.Item>Grunt <Icon name="search" /></Dropdown.Item>}
                                        onSelect={handleGruntSelect} />
                                </Dropdown.Menu>
                            </FormDropdown>

                            <Button onClick={startBattle}>BATTLE</Button>
                        </Form>
                    </Grid.Column>

                    <Grid.Column widescreen={7}>
                        <TrainerView key={rocket.name + rocket.level} trainer={rocket} rocket />
                    </Grid.Column>
                </Grid>
            </Container >
        )
}

export default BattleView;