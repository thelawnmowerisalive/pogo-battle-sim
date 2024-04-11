import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormDropdown, FormInput, Grid } from "semantic-ui-react";
import Pokedex from "../model/Pokedex";
import RocketTrainer from "../model/RocketTrainer";
import Trainer from "../model/Trainer";
import TrainerView from "./TrainerView";
import { ROCKETS, getRocketMultiplier } from "./rockets";
import { handleDropdownChange, handleInputChange, stringToDropdownItemProps } from "./utils";
import Battle from "../battle/Battle";
import BattleSideView from "./BattleSideView";
import InstructionsView from "./InstructionsView";

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
    const defaults = {
        level: 42,
        trainer: 'Trainer',
        rocket: ROCKETS[0]
    }
    const [trainer, setTrainer] = useState(new Trainer(defaults.trainer, defaults.level));
    const [rocket, setRocket] = useState(new RocketTrainer(defaults.rocket, defaults.level, getRocketMultiplier(defaults.rocket)));

    const [battle, setBattle] = useState(undefined as unknown as Battle);

    const handleNameChange = (value: string) => {
        setTrainer(new Trainer(value, trainer.level));
    }

    const handleLevelChange = (value: number) => {
        setTrainer(new Trainer(trainer.name, value));
    }

    const handleRocketChange = (value: string) => {
        setRocket(new RocketTrainer(value, trainer.level, getRocketMultiplier(value)));
    }

    const startBattle = () => {
        console.log(trainer);
        console.log(rocket);

        const x = new Battle(trainer, rocket);
        x.simulate();
        console.log(x);
        setBattle(x);
    }

    return !ready ? <div>NOT INITIALIZED YET</div> : (
        <Container>
            {
                battle ?
                    <div className="battle">
                        <table>
                            <tbody>
                                <BattleSideView battle={battle} left />
                                <BattleSideView battle={battle} />
                            </tbody>
                        </table>
                    </div>
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
                            options={ROCKETS.map(stringToDropdownItemProps)}
                            value={rocket.name}
                            onChange={handleDropdownChange(handleRocketChange)} />

                        <Button onClick={startBattle}>BATTLE</Button>
                    </Form>
                </Grid.Column>

                <Grid.Column widescreen={7}>
                    <TrainerView trainer={rocket} rocket />
                </Grid.Column>
            </Grid>
        </Container >
    )
}

export default BattleView;