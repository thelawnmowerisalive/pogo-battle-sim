import React, { useEffect, useState } from "react";
import { Container, Grid, Rail } from "semantic-ui-react";
import Battle from "../battle/Battle";
import Pokedex from "../model/Pokedex";
import RocketTrainer from "../model/RocketTrainer";
import Trainer from "../model/Trainer";
import RocketTrainerView from "./RocketTrainerView";
import TrainerView from "./TrainerView";

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
        rocket: 'Giovanni'
    }
    const [trainer, setTrainer] = useState(new Trainer(defaults.trainer, defaults.level));
    const [rocket, setRocket] = useState(new RocketTrainer(defaults.rocket, defaults.level, 1.15));
    const [battle, setBattle] = useState(new Battle(trainer, rocket));

    const items: any[] = [];

    function simulate() {
        // battle.log.forEach(entry => {
        //     items.push({
        //         cardTitle: entry.count,
        //         cardSubtitle: entry.left.text
        //     });

        //     items.push({
        //         cardTitle: entry.count,
        //         cardSubtitle: entry.right.text
        //     })
        // });

        // setBattle(battle);
    }

    return !ready ? <div>NOT INITIALIZED YET</div> : (
        <Container>
            <Grid celled>
                <Grid.Row>
                    <Grid.Column computer={7} mobile={15}>
                        <TrainerView trainer={trainer} onChange={setTrainer} />
                    </Grid.Column>
                    <Grid.Column width={1}>
                        {/* divider */}
                    </Grid.Column>
                    <Grid.Column computer={7} mobile={15}>
                        <RocketTrainerView trainer={rocket} onChange={setRocket} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {/* <div className="trainers">
                
                
            </div>

            <div className="battle">
                <div className="battle-results">
                    AND THE WINNER IS... {battle.winner?.trainer.name}
                </div>

                <PokemonStateView
                    state={battle.left}>
                </PokemonStateView>

                <PokemonStateView
                    state={battle.right}>
                </PokemonStateView>

                <table>
                    <tbody>
                        <BattleSideView battle={battle} left={true} />
                        <BattleSideView battle={battle} left={false} />
                    </tbody>
                </table>
            </div> */}
        </Container>
    )
}

export default BattleView;