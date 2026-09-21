import { GridUnit } from "./GridUnit";
import { Month } from "./Month";

import './Grid.css';

export function Grid({ compoundScores }) {

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <div className="month-grid">

            {months.map((month) => {
                
                const monthScores = compoundScores.filter(
                    score => Number(score.date.slice(5, 7)) === month
                );

                return (
                    <Month key={month} month={month} monthScores={monthScores}/>
                );
            })}

        </div>
    )

}