function getStrokeStyle({ data: { datasets }}) {
    return datasets?.length
        ? datasets[0].borderColor
        : 'black';
}

export function crossHairPlugin({
    verticalLineColor = 'black',
    horizontalLineColor = 'black',
    drawUnderTooltip = true
} = {}) {
    const isCurrentColor = 'currentColor' === horizontalLineColor;

    const draw = (e, tooltipHeight = 0) => {
        const activeElement = e.getActiveElements()[0];

        if (activeElement) {
            const {
                ctx, //c
                chartArea:
                    {
                        top, // s,
                        left, //: d,
                        right, //: u,
                        bottom //: p
                    }
            } = e;

            const {
                x, //: f,
                y //: v
            } = activeElement.element.tooltipPosition();

            const newY = tooltipHeight + e.scales.yAxis?.top - top + 2;

            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([4, 4]);
            ctx.moveTo(x, newY);

            if (y - 7 > newY) {
                ctx.lineTo(x, y - 7);
                ctx.moveTo(x, y + 7);
            }

            ctx.lineTo(x, bottom);
            ctx.lineWidth = 1;
            ctx.strokeStyle = verticalLineColor;
            ctx.stroke();
            ctx.beginPath();
            ctx.setLineDash([1, 4]);
            ctx.moveTo(left, y);
            ctx.lineTo(x - 7, y),
            ctx.moveTo(x + 7, y),
            ctx.lineTo(right, y),
            ctx.lineWidth = 1;
            ctx.strokeStyle = isCurrentColor
                ? getStrokeStyle(e)
                : horizontalLineColor;
            ctx.stroke(),
            ctx.restore()
        }
    }

    return drawUnderTooltip
        ? {
            id: 'crossHairPlugin',
            beforeTooltipDraw: chart => draw(chart)
        }
        : {
            id: 'crossHairPlugin',
            afterTooltipDraw: (chart, { tooltip }) => draw(chart, tooltip?.height ?? 0)
        };
}


export function activePointCirclePlugin({
    innerColor = 'black',
    outerColor = 'black'
} = {}) {
    const isCurrentColor = 'currentColor' === innerColor;
    const shadowColor = 'rgba(0, 0, 0, 0.12)';
    const i = 'transparent';

    return {
        id: 'activePointCirclePlugin',
        beforeTooltipDraw: chart => {
            const activeElement = chart.getActiveElements()[0];

            if (activeElement) {
                const { ctx } = chart;
                const { x, y } = activeElement.element.tooltipPosition();

                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, 6.5, 0, 2 * Math.PI, !1);

                ctx.shadowColor = shadowColor;
                ctx.shadowBlur = 25;
                ctx.fillStyle = outerColor;

                ctx.fill();
                ctx.shadowColor = i;
                ctx.shadowBlur = 0;

                ctx.beginPath(),
                ctx.arc(x, y, 4.5, 0, 2 * Math.PI, !1);
                ctx.fillStyle = isCurrentColor
                    ? getStrokeStyle(chart)
                    : innerColor;
                ctx.fill();
                ctx.restore();
            }
        }
    }
}

function getLastElement(arr) {
    return arr[Math.max(0, arr.length - 1)];
}

// function compare chart items
// if itemIndex - compare first and active item (data[itemIndex])
// else - compare first and last elements
function compareChatDataItems({ datasets } = {}, datasetIndex, itemIndex) {
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

export function relativeColorPlugin({
    upColor = 'green',
    downColor = 'red'
} = {}) {
    let v = false;

    const draw = (chart, color, index) => {
        const elem = chart.data.datasets?.[index];

        if (elem?.borderColor !== color) {
            elem.borderColor = color;
            elem.backgroundColor = createGradientBackground(color);
            
            chart.update('none');
        }
    }

    return {
        id: 'relativeColorPlugin',
        afterDatasetUpdate: chart => {
            v || draw(
                chart,
                compareChatDataItems(chart.data, 0)
                    ? upColor
                    : downColor,
                0
            )
        },
        afterEvent: (chart, { event }) => {
            const elements = chart.getElementsAtEventForMode(event, "index", {}, !0);

            let datasetIndex;
            let index;

            if (event.type !== 'mouseout' && elements?.length) {
                datasetIndex = elements[0].datasetIndex;
                index = elements[0].index;
                v = true; // ???
            } else {
                datasetIndex = 0;
                v = false; 
            }

            draw(
                chart,
                compareChatDataItems(chart.data, datasetIndex, index)
                    ? upColor
                    : downColor,
                datasetIndex
            )
        }
    }
}

// export function createGradientBackground({ ctx } = {}, color) {
//     if (!ctx)
//         return 'transparent';

//     const gradient = ctx.createLinearGradient(0, 0, 0, 200);

//     gradient.addColorStop(0, `${ color }50`);
//     gradient.addColorStop(0.9, `${ color }00`);
//     gradient.addColorStop(1, `${ color }00`);
    
//     return gradient;
// }

export const createGradientBackground = color => ({ chart: { ctx, chartArea }} = {}) => {
    if (!ctx)
        return 'transparent';

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

    gradient.addColorStop(0, `${ color }30`);
    // gradient.addColorStop(0.8, `${ color }00`);
    gradient.addColorStop(1, `${ color }00`);
    
    return gradient;
}