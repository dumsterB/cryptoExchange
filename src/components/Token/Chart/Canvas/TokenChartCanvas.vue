<script setup>
import { onUnmounted, reactive, ref, toRaw, watchEffect } from 'vue';
import ChartTooltip from '../Tooltip/ChartTooltip';
import { useI18n } from 'vue-i18n';
import { Chart } from 'chart.js';
import getSettings from '../config/settings.js';
import colors from '../config/colors.js';
import plugins from '../utils/plugins';
import { setChartDatasets } from '../utils/datasets';

const props = defineProps({
    data: {
        type: Array,
        default: () => ([])
    },
    topPadding: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits({
    hover: null,
    mouseout: null
});

const { locale } = useI18n();
const settings = getSettings(locale);

// we need object here, cause of pass it to setChartDatasets
const chart = {
    value: null
}; 
const canvas = ref(null);
const tooltipProps = reactive({
    text: '',
    x: 0,
    y: 0,
    caretX: 0,
    caretY: 0,
    opacity: 0
});

const handleHover = e => emit('hover', e);
const handleMouseOut = e => emit('mouseout', e);
const handleDataUpdate = setChartDatasets(chart, colors);

// init chart
watchEffect(() => {
    if (canvas.value && !chart.value && props.data.length) {
        settings.plugins = plugins(colors);

        settings.options.onHover = ctx => {
            const element = ctx.chart.getElementsAtEventForMode(ctx, 'index', {}, !0)?.[0];

            if (element) {
                const { datasetIndex, index } = element;
                const datasetItem = ctx.chart.data.datasets[datasetIndex].data[index];
                const { x, y } = datasetItem;

                handleHover({ x, y });
            }
        };

        settings.options.plugins.tooltip.external = ({ chart: { canvas }, tooltip }) => {
            const { offsetLeft: x, offsetTop: y } = canvas;
            const { caretX, caretY, opacity, title: [ text ] } = tooltip;

            tooltipProps.text = text;
            tooltipProps.x = x;
            tooltipProps.y = y;
            tooltipProps.caretX = caretX;
            tooltipProps.caretY = caretY;
            tooltipProps.opacity = opacity;
        };
        
        settings.options.layout.padding.top = props.topPadding;

        chart.value = new Chart(
            canvas.value,
            settings
        );

        handleDataUpdate([...toRaw(props.data)]);
    }
});

watchEffect(() => {
    if (props.data.length && chart.value) {
        handleDataUpdate([...toRaw(props.data)]);
    }
});

onUnmounted(() => {
    if (chart.value) {
        chart.value.destroy();
        chart.value = null;
    }
});

defineExpose({ update: handleDataUpdate });
</script>

<template>
    <div>
        <canvas
            ref="canvas"
            width="200"
            height="200"
            @mouseout="handleMouseOut"
            @touchend="handleMouseOut"
        />

        <ChartTooltip
            :text="tooltipProps.text"
            :x="tooltipProps.x"
            :y="tooltipProps.y"
            :caret-x="tooltipProps.caretX"
            :caret-y="tooltipProps.caretY"
            :opacity="tooltipProps.opacity"
        />
    </div>
</template>