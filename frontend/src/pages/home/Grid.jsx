import { GridUnit } from "./GridUnit";

export function Grid({ compoundScores }) {

    return (
        <div>
            {compoundScores.map((compoundScore) => {
                return (
                    <GridUnit key={compoundScore.id} score={compoundScore.score}/>
                );
            })}
        </div>
    )

}