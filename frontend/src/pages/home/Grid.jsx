import { GridUnit } from "./GridUnit";

import './Grid.css';

export function Grid({ compoundScores }) {

    return (
        <div className="score-grid">
            {compoundScores.map((compoundScore) => {
                return (
                    <GridUnit key={compoundScore.id} score={compoundScore.score}/>
                );
            })}
        </div>
    )

}