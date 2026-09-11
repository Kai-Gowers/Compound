export function GridUnit({ score }) {

    const lightness = 95 - score * 55

    return (
        <div 
            style={{
                width: "24px",
                height: "24px",
                backgroundColor: `hsl(120, 60%, ${lightness}%)`,
                borderRadius: "4px",
            }}
        />
    );

}