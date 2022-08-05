import { Chart, LineElement, PointElement, ScatterController, CategoryScale, LinearScale, Tooltip, Filler } from 'chart.js';
import { formatTimestamp } from '@/utils/date';

Chart.register(
    LineElement,
    PointElement,
    ScatterController,
    CategoryScale,
    LinearScale,
    Tooltip,
    Filler
);

const settings = locale => ({
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
                top: 6,
                left: 6,
                right: 6,
                bottom: 6
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
                        return formatTimestamp(point.raw.x, locale.value);
                    }
                },
                external: null
            },
            // tooltip: {
            //     enabled: false
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
});

export default settings;