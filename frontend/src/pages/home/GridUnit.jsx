import './GridUnit.css';

export function GridUnit({ score, title, date, setSelectedDate }) {

    const lightness = 95 - score * 55

    const clickDate = () => {
        setSelectedDate(date);
    }

    return (
        <div
            onClick={clickDate}
            title={title}
            className="grid-unit"
            style={{
                backgroundColor: `hsl(120, 60%, ${lightness}%)`,
            }}
        />
    );

}