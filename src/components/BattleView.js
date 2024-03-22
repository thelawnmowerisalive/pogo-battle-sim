import BattleSideView from "./BattleSideView";

function BattleView({ battle }) {
    return (
        <>
            <div className="battle">
                <BattleSideView left={true} battle={battle}></BattleSideView>
                <BattleSideView left={false} battle={battle}></BattleSideView>
            </div>

            <div className="battle-results">
                AND THE WINNER IS... {battle.winner.trainer.name}
            </div>
        </>
    )
}

export default BattleView;