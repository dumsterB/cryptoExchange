export const CURRENT_COLOR = 'currentColor';

export function getDatasetsBorderColor({ data: { datasets }}) {
    return datasets?.[0]?.borderColor || 'black';
}

export const createGradientBackground = color => ({ chart: { ctx, chartArea }} = {}) => {
    if (!ctx)
        return 'transparent';

    const gradient = ctx.createLinearGradient(
        0,
        chartArea?.top ?? 0,
        0,
        chartArea?.bottom ?? 200
    );

    gradient.addColorStop(0, `${ color }25`);
    gradient.addColorStop(1, `${ color }00`);
    
    return gradient;
};

export function getLastElement(arr) {
    return arr[Math.max(0, arr.length - 1)];
}

// function compare chart items
// if itemIndex - compare first and active item (data[itemIndex])
// else - compare first and last elements
export function compareChatDataItems({ datasets } = {}, datasetIndex, itemIndex) {
    if (!datasets?.[datasetIndex])
        return;

    const { data } = datasets[datasetIndex];

    if (!data?.length)
        return;

    const active = itemIndex
        ? data[itemIndex]
        : getLastElement(data);

    if (!active)
        return;
    
    const first = data[0];

    return active?.y >= first?.y;
}