import { GridUnit } from "./GridUnit";

import './Month.css';

export function Month({ month, monthScores }) {

    return (

        <div className="score-grid">

            <h2>{month}</h2>

            {monthScores.map((monthScore) => {
                return (
                    <GridUnit key={monthScore.id} score={monthScore.score}/>
                );
            })}

        </div>

    );

}