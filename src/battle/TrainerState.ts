import Trainer from "../model/Trainer";
import PokemonState from "./PokemonState";

class TrainerState {
    trainer: Trainer;
    team: PokemonState[] = [];

    shields = 2;
    dead = 0;

    // simulate stunning rockets
    wakeUpTurn = 0;

    constructor(trainer: Trainer) {
        this.trainer = trainer;
        for (let pokemon of trainer.team) {
            this.team.push(new PokemonState(pokemon));
        }
    }
}

export default TrainerState;
