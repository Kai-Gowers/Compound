import './GridUnit.css';

export function GridUnit({ score, title }) {

    const lightness = 95 - score * 55

    return (
        <div
            title={title}
            className="grid-unit"
            style={{
                backgroundColor: `hsl(120, 60%, ${lightness}%)`,
            }}
        />
    );

}