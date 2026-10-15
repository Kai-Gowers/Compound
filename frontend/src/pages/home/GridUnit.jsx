import './GridUnit.css';

export function GridUnit({ score, title, date, onSelectDate }) {

    const lightness = 95 - score * 55;

    return (
        <div
            onClick={() => onSelectDate(date)}
            title={title}
            className="grid-unit"
            style={{
                backgroundColor: `hsl(120, 60%, ${lightness}%)`,
            }}
        />
    );

}