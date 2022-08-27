import { compareChatDataItems, createGradientBackground } from '../helpers';

export function relativeColorPlugin({
    upColor = 'green',
    downColor = 'red'
} = {}) {
    // TODO: check
    let v = false;

    const draw = (chart, color, index) => {
        const elem = chart.data.datasets?.[index];

        if (elem && elem?.borderColor !== color) {
            elem.borderColor = color;
            elem.backgroundColor = createGradientBackground(color);
            
            chart.update('none');
        }
    };

    return {
        id: 'relativeColorPlugin',
        afterDatasetUpdate: chart => {
            v || draw(
                chart,
                compareChatDataItems(chart.data, 0)
                    ? upColor
                    : downColor,
                0
            );
        },
        afterEvent: (chart, { event }) => {
            const elements = chart.getElementsAtEventForMode(event, 'index', {}, !0);

            let datasetIndex;
            let index;

            if (event.type !== 'mouseout' && elements?.length) {
                datasetIndex = elements[0].datasetIndex;
                index = elements[0].index;
                v = true;
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
            );
        }
    };
}