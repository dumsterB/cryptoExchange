<script setup>
import { computed, onMounted, onUnmounted, ref, toRef, useCssModule, watchEffect } from 'vue';
import AssetIcon from '@/components/asset/icon/AssetIcon.vue';
import PercentChange from '@/components/general/percent/PercentChange.vue';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';
import SkeletonBox from '@/components/general/skeleton/SkeletonBox';
import { setupChart } from './services/setup';
import { formatCurrency } from '@/2v/entities/currency/utils/format';
import { useI18n } from 'vue-i18n';
import { useCurrencyStore } from '@/2v/entities/currency/store/currency';
import { useChartSubscriber } from './hooks/useChartSubscriber';
import { useRealtimePriceChart } from '@/services/api/realtime/priceChart';

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
    padding: {
        type: Object,
        default: () => ({
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        })
    },
    delay: {
        type: Number,
        default: 0
    },
    ready: Boolean,
    mobile: Boolean
});

const { t, locale } = useI18n();
const currencyStore = useCurrencyStore();

const isReady = toRef(props, 'ready');
const currentPrice = ref(props.price);

// const stop = watchEffect(() => {
//     if (props.price !== 0){
//         currentPrice.value = props.price;

//         stop();
//     }
// });

watchEffect(
    () => currentPrice.value === null && (currentPrice.value = props.price)
);

const pair = computed(() => {
    if (!props.mobile)
        return null;

    return `${ props.symbol }/${ currencyStore.currency.symbol }`;
});

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
        padding: props.padding,
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

const relativeChange24h = computed(
    () => getRelativeChange(currentPrice.value)
);

const {
    isLoading,
    subscribeToTickerChart,
    unsubscribeFromTickerChart
} = useRealtimePriceChart(setChartDatasets, pushToChartDataset);

useChartSubscriber(
    () => subscribeToTickerChart(
        props.symbol,
        interval.value
    ),
    interval,
    props.delay,
    isReady
);

onMounted(initChart);

onUnmounted(() => {
    destroyChart();
    unsubscribeFromTickerChart();
});

const styles = useCssModule('styles');

const wrapClasses = computed(() => [styles.wrap, {
    [styles.mobile]: props.mobile
}]);

const getIntervalClasses = current => {
    return [
        styles.interval,
        { [styles.active]: interval.value === current }
    ];
};

const preloaderIcon = props.mobile
    ? 'chart-preloader-mobile'
    : 'chart-preloader';
</script>

<template>
    <div :class="wrapClasses">

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

                    <div
                        v-else
                        :class="styles.assetTitle"
                    >
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
                    {{ formatCurrency(currentPrice, locale, currencyStore.code) }}
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
                :name="preloaderIcon"
                :class="styles.chartPreloader"
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