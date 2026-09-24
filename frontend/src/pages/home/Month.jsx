import { GridUnit } from "./GridUnit";

import './Month.css';

export function Month({ month, monthScores }) {

    const numToMonth = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }

    return (

        <div className="score-grid">

            <h2>{month}</h2>

            {monthScores.map((monthScore) => {
                return (
                    <GridUnit 
                        key={monthScore.id} 
                        score={monthScore.score}
                        title={`${numToMonth[Number(monthScore.date.slice(5, 7))]} ${Number(monthScore.date.slice(8, 10))}: ${monthScore.score * 100}`}
                    />
                );
            })}

        </div>

    );

}