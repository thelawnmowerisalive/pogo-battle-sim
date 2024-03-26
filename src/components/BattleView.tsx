import React from "react";
import Battle from "../battle/Battle";
import BattleSideView from "./BattleSideView";
import PokemonStateView from "./PokemonStateView";

function BattleView({ battle }: { battle: Battle }) {

    const items: any[] = [];

    battle.log.forEach(entry => {
        items.push({
            cardTitle: entry.count,
            cardSubtitle: entry.left.text
        });

        items.push({
            cardTitle: entry.count,
            cardSubtitle: entry.right.text
        })
    });

    return (
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
        </div>
    )
}

export default BattleView;