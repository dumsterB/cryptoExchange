<script setup>
import { computed, onMounted, onUnmounted, ref, useCssModule, watchEffect } from 'vue';
import AssetIcon from '@/components/asset/icon/AssetIcon.vue';
import { useMainStore } from '@/stores/main';
import { useCurrencyFormat } from '@/utils/format/currency';
import PercentChange from '@/components/general/percent/PercentChange.vue';
import { setupChart } from './services/setup';
import { useRealtimePriceChart } from '@/services/api/realtime/priceChart';
import VIcon from '@/components/common/icon/VIcon.vue';
import SkeletonBox from '@/components/general/skeleton/SkeletonBox';
import { useI18n } from 'vue-i18n';

// TODO: v-if for chat canvas
const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    symbol: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    iconUrl: {
        type: String,
        required: true
    },
    topPadding: {
        type: Number,
        default: 20
    },
    mobile: Boolean
});

const { t } = useI18n();
const mainStore = useMainStore();

const currentPrice = ref(props.price);

watchEffect(
    () => currentPrice.value === null && (currentPrice.value = props.price)
);

const pair = computed(() => {
    if (!props.mobile)
        return null;

    return `${ props.symbol }/${ mainStore.currency.toUpperCase() }`;
});

const { formatCurrency } = useCurrencyFormat();

const interval = ref('1h');

const INTERVAL_1H = '1h';
const INTERVAL_1D = '1d';
const INTERVAl_1M = '1m';
const INTERVAL_1Y = '1y';

const setInterval = val => {
    interval.value = val;
};

const canvas = ref(null);

const { initChart, setChartDatasets, pushToChartDataset, destroyChart, getRelativeChange } = setupChart(
    canvas,
    {
        topPadding: props.topPadding,
        hoverCallback: ctx => {
            const element = ctx.chart.getElementsAtEventForMode(ctx, 'index', {}, !0)?.[0];

            if (element) {
                const { datasetIndex, index } = element;
                const datasetItem = ctx.chart.data.datasets[datasetIndex].data[index];
                const { y: price  } = datasetItem;

                currentPrice.value = price;
            }
        }
    }
);

const relativeChange24h = computed(() => getRelativeChange(currentPrice.value));

const {
    isLoading,
    subscribeToTickerChart,
    unsubscribeFromTickerChart
} = useRealtimePriceChart(setChartDatasets, pushToChartDataset);

watchEffect(() => subscribeToTickerChart(
    props.symbol,
    interval.value
));

onMounted(initChart);

onUnmounted(() => {
    destroyChart();
    unsubscribeFromTickerChart();
});

const styles = useCssModule('styles');

const getIntervalClasses = current => {
    return [
        styles.interval,
        { [styles.active]: interval.value === current }
    ];
};
</script>

<template>
    <div :class="styles.wrap">

        <div :class="styles.head">
            <div :class="styles.info">
                <SkeletonBox
                    v-if="isLoading"
                    :class="styles.assetSkeleton"
                />
                <div
                    v-else
                    :class="styles.asset"
                >
                    <AssetIcon
                        v-if="mobile"
                        :src="iconUrl"
                        size="s"
                    />

                    <div
                        v-if="mobile"
                        :class="styles.assetTitle"
                    >
                        {{ pair }}
                    </div>

                    <div :class="styles.assetTitle">
                        {{ name }} <span>({{ symbol }})</span>
                    </div>
                </div>

                <SkeletonBox
                    v-if="isLoading"
                    :class="styles.priceSkeleton"
                />
                <div
                    v-else
                    :class="styles.price"
                >
                    {{ formatCurrency(currentPrice) }}
                </div>

                <SkeletonBox
                    v-if="isLoading"
                    :class="styles.percentSkeleton"
                />
                <PercentChange
                    v-else
                    :value="relativeChange24h"
                />
            </div>

            <div
                v-if="isLoading"
                :class="styles.controls"
            >
                <SkeletonBox :class="styles.skeleton" />
                <SkeletonBox :class="styles.skeleton" />
                <SkeletonBox :class="styles.skeleton" />
                <SkeletonBox :class="styles.skeleton" />
            </div>

            <div
                v-else
                :class="styles.controls"
            >
                <button
                    :class="getIntervalClasses(INTERVAL_1H)"
                    @click="setInterval(INTERVAL_1H)"
                >
                    {{ t('chartInterval1h') }}
                </button>
                <button
                    :class="getIntervalClasses(INTERVAL_1D)"
                    @click="setInterval(INTERVAL_1D)"
                >
                    {{ t('chartInterval1d') }}
                </button>
                <button
                    :class="getIntervalClasses(INTERVAl_1M)"
                    @click="setInterval(INTERVAl_1M)"
                >
                    {{ t('chartInterval1m') }}
                </button>
                <button
                    :class="getIntervalClasses(INTERVAL_1Y)"
                    @click="setInterval(INTERVAL_1Y)"
                >
                    {{ t('chartInterval1y') }}
                </button>
            </div>
        </div>

        <div :class="styles.chart">
            <VIcon
                v-if="isLoading"
                name="chart-preloader"
            />
            
            <canvas
                v-show="!isLoading"
                ref="canvas"
                width="200"
                height="200"
                @mouseout="currentPrice = null"
                @touchend="currentPrice = null"
            />
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './AssetChart.module.scss';
</style>