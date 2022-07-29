// const numberFormat = new Intl.NumberFormat('en-US', {
//     style: 'percent',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
// });

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