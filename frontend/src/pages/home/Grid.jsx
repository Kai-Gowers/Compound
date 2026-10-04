import { GridUnit } from "./GridUnit";
import "./Grid.css";

function parseLocalDate(iso) {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day);
}

export function Grid({ compoundScores }) {
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
        12: "December",
    };

    const scores = compoundScores ?? [];
    if (scores.length === 0) {
        return null;
    }

    const padCount = parseLocalDate(scores[0].date).getDay();

    const cells = [
        ...Array.from({ length: padCount }, (_, i) => ({
            kind: "pad",
            key: `pad-${i}`,
        })),
        ...scores.map((score) => ({
            kind: "day",
            key: score.date,
            score,
        })),
    ];

    const weekCount = Math.ceil(cells.length / 7);
    const monthLabels = [];
    let lastMonth = null;

    for (let week = 0; week < weekCount; week += 1) {
        const weekCells = cells.slice(week * 7, week * 7 + 7);
        const day = weekCells.find((cell) => cell.kind === "day");
        if (!day) {
            monthLabels.push("");
            continue;
        }
        const month = Number(day.score.date.slice(5, 7));
        if (month !== lastMonth) {
            monthLabels.push(numToMonth[month].slice(0, 3));
            lastMonth = month;
        } else {
            monthLabels.push("");
        }
    }

    return (
        <div className="contribution-graph">
            <div
                className="month-labels"
                style={{ gridTemplateColumns: `repeat(${weekCount}, 12px)` }}
            >
                {monthLabels.map((label, index) => (
                    <span key={index} className="month-label">
                        {label}
                    </span>
                ))}
            </div>
            <div className="grid">
                {cells.map((cell) =>
                    cell.kind === "pad" ? (
                        <div key={cell.key} className="grid-unit grid-unit--empty" />
                    ) : (
                        <GridUnit
                            key={cell.key}
                            score={cell.score.score}
                            title={`${numToMonth[Number(cell.score.date.slice(5, 7))]} ${Number(cell.score.date.slice(8, 10))}: ${Math.round(cell.score.score * 100)}`}
                        />
                    )
                )}
            </div>
        </div>
    );
}