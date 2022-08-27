import { compareChatDataItems, createGradientBackground } from './helpers';

// chart - vue ref
export const setChartDatasets = (chart, colors) => (
    data,
    {
        borderWidth = 2,
        fill = 'start',
        order = 1
    } = {}
) => {
    const activeColor = compareChatDataItems(data, 0)
        ? colors.relative.up
        : colors.relative.down;

    chart.value.data.datasets = [{
        data,
        borderWidth,
        borderColor: activeColor,
        backgroundColor: createGradientBackground(activeColor),
        fill,
        order,
    }];

    chart.value.update();
};