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