<script setup>
import { computed, useCssModule } from 'vue'
import { useI18n } from 'vue-i18n'
import PercentChange from '@/components/general/percent/PercentChange.vue'
import PortfolioBalance from '@/components/general/balance/PortfolioBalance.vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { useCurrencyFormat } from '@/utils/format/currency'
import { storeToRefs } from 'pinia'

const { t } = useI18n(); 
const styles = useCssModule('styles');
const portfolioStore = usePortfolioStore();

const {
    absoluteChange24h,
    relativeChange24h
} = storeToRefs(portfolioStore);

const { formatCurrency } = useCurrencyFormat();

const amountChange = computed(() => {
    return `(${ formatCurrency(absoluteChange24h.value) })`;
});

const amountChangeClasses = computed(() => {
    return [styles.amountChange, {
        [styles.green]: absoluteChange24h.value > 0,
        [styles.red]: absoluteChange24h.value < 0
    }];
});
</script>

<template>
    <div :class="styles.wrap">

        <div :class="styles.text">
            {{ t('commonBalance' ) }}
        </div>

        <PortfolioBalance :class="styles.balance" />

        <div
            v-if="absoluteChange24h !== 0"
            :class="styles.dynamics"
        >
            <PercentChange :value="relativeChange24h" />

            <div :class="amountChangeClasses">
                {{ amountChange }}
            </div>
        </div>
        
    </div>
</template>

<style lang="scss" module="styles">
@import './HomeBalance.module.scss';
</style>