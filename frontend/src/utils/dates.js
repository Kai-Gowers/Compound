
export function currentYearRange() {

    const now = new Date();

    const end = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
    ].join("-");

    const start = [
        now.getFullYear() - 1,
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
    ].join("-");

    return [start, end];

}

export function listOfYears(beginYear) {

    const now = new Date();
    const year = now.getFullYear();
    const years = [];
        
    for (let i = year; i > beginYear; i = i - 1) {
        years.push(i);
    }

    return years;

}