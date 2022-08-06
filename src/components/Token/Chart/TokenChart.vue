<script setup>
import { computed, ref, useCssModule } from 'vue';
import { VIcon, VSkeletonLoader, VRelativeChange } from '@/uikit';
import TokenIcon from '../Icon/TokenIcon';
import TokenChartCanvas from './Canvas/TokenChartCanvas.vue';
import relativeChange from './utils/relativeChange';
import { formatCurrency } from '@/utils/currency';
import { useI18n } from 'vue-i18n';
import { useIntervals } from './hooks/useIntervals';
import { useTokenChart } from '@/states/token/hooks/useTokenChart';
import { useCurrencyStore } from '@/states/currency/store';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
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
    paddingTop: {
        type: Number,
        default: 0
    },
    mobile: Boolean
});

const { t, locale } = useI18n();
const styles = useCssModule('styles');
const currencyStore = useCurrencyStore();

const {
    interval,
    intervalsList,
    updateInterval
} = useIntervals(styles);
// TODO: loader for interval update

const {
    data,
    isLoading
} = useTokenChart(props.id, interval);

const wrapClasses = computed(() =>
    [
        styles.wrap,
        { [styles.mobile]: props.mobile }
    ]
);

const preloaderIcon = computed(() => props.mobile
    ? 'chart-preloader-mobile'
    : 'chart-preloader'
);

const currentPrice = ref(null);

const tokenPrice = computed(() => currentPrice.value
    ? currentPrice.value
    : props.price
);

const relativeChange24h = computed(() => relativeChange(
    currentPrice.value,
    data
));

const pair = computed(() => {
    if (!props.mobile)
        return null;

    return `${ props.symbol }/${ currencyStore.currency.symbol }`;
});

const handleChartHover = ({ y }) => currentPrice.value = y;
const handleChartMouseout = () => currentPrice.value = null;
</script>

<template>
    <div :class="wrapClasses">

        <div :class="styles.head">
            <div :class="styles.info">
                <VSkeletonLoader
                    v-if="isLoading"
                    :class="styles.assetSkeleton"
                />
                <div
                    v-else
                    :class="styles.asset"
                >
                    <TokenIcon
                        v-if="mobile"
                        :image="iconUrl"
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

                <VSkeletonLoader
                    v-if="isLoading"
                    :class="styles.priceSkeleton"
                />
                <div
                    v-else
                    :class="styles.price"
                >
                    {{ formatCurrency(tokenPrice, locale, currencyStore.code) }}
                </div>

                <VSkeletonLoader
                    v-if="isLoading"
                    :class="styles.percentSkeleton"
                />
                <VRelativeChange
                    v-else
                    :value="relativeChange24h"
                />
            </div>

            <div
                v-if="isLoading"
                :class="styles.controls"
            >
                <VSkeletonLoader
                    v-for="({ value }) in intervalsList"
                    :key="value"
                    :class="styles.skeleton"
                />
            </div>

            <div
                v-else
                :class="styles.controls"
            >
                <button
                    v-for="({ label, value, classes }) in intervalsList"
                    :key="value"
                    :class="classes"
                    @click="updateInterval(value)"
                >
                    {{ t(label) }}
                </button>
            </div>
        </div>

        <div :class="styles.chart">
            <VIcon
                v-if="isLoading"
                :name="preloaderIcon"
                :class="styles.chartPreloader"
            />
            
            <TokenChartCanvas
                v-show="!isLoading"
                ref="chart"
                :data="data"
                :top-padding="paddingTop"
                @hover="handleChartHover"
                @mouseout="handleChartMouseout"
            />
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './TokenChart.module.scss';
</style>