export function formatPercent(value) {
    const num = parseFloat(value).toFixed(1);

    if (num === 0) {
        return `${ num }%`;
    } else {
        return num > 0
            ? `+${ num }%`
            : `${ num }%`;
    }
}