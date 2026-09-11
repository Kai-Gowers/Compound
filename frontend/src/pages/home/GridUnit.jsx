import './GridUnit.css';

export function GridUnit({ score }) {

    const lightness = 95 - score * 55

    return (
        <div
            className="grid-unit"
            style={{
                backgroundColor: `hsl(120, 60%, ${lightness}%)`,
            }}
        />
    );

}