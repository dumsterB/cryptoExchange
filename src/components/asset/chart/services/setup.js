import Chart from 'chart.js/auto'; // TODO: fix
// import { CategoryScale, Chart, LinearScale, LineElement, PointElement, ScatterController, Tooltip } from 'chart.js';
import { unref } from 'vue';
import { activePointCirclePlugin } from '../plugins/activeCirclePoint';
import { crossHairPlugin } from '../plugins/crossHair';
import { relativeColorPlugin } from '../plugins/relativeColor';
// import { tooltipPlugin } from '../plugins/tooltip';
import { compareChatDataItems, getLastElement } from '../utils/compare';
import { createGradientBackground } from '../utils/gradient';
import { tooltipHandler } from '../tooltip/tooltip';
import { formatTsToBeautifulDate } from '@/utils/format/date';

const COLORS = {
    relative: {
        up: '#499566',
        down: '#D2345B'
    },
    crosshairLine: '#ADABB4',
    pointCircle: {
        outer: '#FFFFFF',
        inner: 'currentColor'
    }
};

const SETTINGS = {
    type: 'scatter',
    data: {
        datasets: []
    },
    plugins: null,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        events: [
            'mousemove',
            'mouseout',
            'click',
            'touchstart',
            'touchmove',
            'touchend'
        ],
        animation: {
            duration: 500
        },
        layout: {
            padding: {
                left: 5,
                right: 5,
                bottom: 5
            }
        },
        plugins: {
            tooltip: {
                enabled: false,
                mode: 'index',
                intersect: false,
                position: 'nearest',
                animation: {
                    duration: 0
                },
                callbacks: {
                    title: ([ point ]) => {
                        return formatTsToBeautifulDate(point.raw.x, false);
                    }
                },
                external: tooltipHandler
            },
            // tooltip: {
            //     enabled: false
            // },
            // tooltip: {
            //     enabled: true,
            //     mode: 'index',
            //     intersect: false,
            //     position: 'nearest',
            //     titleColor: '#ADABB4',
            //     titleFont: {
            //         size: 14,
            //         weight: '400'
            //     },
            //     titleMarginBottom: 0,
            //     bodyColor: '#FFFFFF',
            //     backgroundColor: '#FFFFFF',
            //     borderWidth: 0,
            //     padding: {
            //         left: 12,
            //         right: 12,
            //         top: 8,
            //         bottom: 8
            //     },
            //     caretPadding: 16,
            //     caretSize: 0,
            //     cornerRadius: 16,
            //     displayColors: false,
            //     animation: {
            //         duration: 0
            //     },
            //     filter: () => false,
            //     callbacks: {
            //         title: function ([ point ]) {
            //             if (!point?.raw?.x)
            //                 return;
                            
            //             return formatTsToBeautifulDate(point.raw.x, false);
            //         },
            //     }
            // },
            legend: {
                display: false
            }
        },
        elements: {
            point: {
                radius: () => {
                    return 0;
                },
                hoverRadius: () => {
                    return 0;
                }
            }
        },
        datasets: {
            scatter: {
                showLine: true
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            xAxis: {
                display: false,
                grid: {
                    display: true
                },
                bounds: 'data'
            },
            yAxis: {
                display: false,
                bounds: 'data'
            }
        }
    }
};

function setPlugins() {
    return [
        crossHairPlugin({
            verticalLineColor: COLORS.crosshairLine,
            horizontalLineColor: COLORS.crosshairLine,
        }),
        activePointCirclePlugin({
            outerColor: COLORS.pointCircle.outer,
            innerColor: COLORS.pointCircle.inner
        }),
        relativeColorPlugin({
            upColor: COLORS.relative.up,
            downColor:  COLORS.relative.down
        }),
        // tooltipPlugin({})
    ];
}

export function setupChart(
    canvas,
    {
        topPadding,
        hoverCallback = () => {}
    }
) {
    let chart;
        
    SETTINGS.options.onHover = hoverCallback;
    SETTINGS.options.layout.padding.top = unref(topPadding);
    SETTINGS.plugins = setPlugins();

    const initChart = () => {
        chart = new Chart(
            unref(canvas).getContext('2d'),
            SETTINGS
        );
    };
    
    const setChartDatasets = (
        data,
        {
            borderWidth = 2,
            fill = 'start',
            order = 1
        } = {}
    ) => {
        if (!chart)
            return;

        const activeColor = compareChatDataItems(data, 0)
            ? COLORS.relative.up
            : COLORS.relative.down;

        chart.data.datasets = [{
            data,
            borderWidth,
            borderColor: activeColor,
            backgroundColor: createGradientBackground(activeColor),
            fill,
            order,
        }];

        chart.update();
    };

    const pushToChartDataset = item => {
        if (!chart)
            return;

        chart.data.datasets[0].data.push(item);
        chart.update();
    };

    const getRelativeChange = y => {
        if (!chart)
            return 0;

        const { data } = chart.data.datasets[0];

        const first = data[0];
        const active = y
            ? { y }
            : getLastElement(data);

        if (!active)
            return 0;

        return ((active.y - first.y) * 100 / first.y).toFixed(2);
    };

    const destroyChart = () => {
        if (!chart)
            return;

        chart.destroy();
    };

    return {
        chart,
        initChart,
        setChartDatasets,
        pushToChartDataset,
        getRelativeChange,
        destroyChart
    };
}