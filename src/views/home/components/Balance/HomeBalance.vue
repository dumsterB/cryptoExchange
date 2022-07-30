<script setup>
import { computed, useCssModule } from 'vue';
import { RelativeChange } from '@/uikit';
import { CurrencyNumber, SafeShow } from '@/components/Currency';
import { formatCurrency } from '@/utils/currency';
import { useI18n } from 'vue-i18n';
import { useCurrencyStore } from '@/stores/currency';
import { usePortfolioStore } from '@/stores/portfolio';

const { t, locale } = useI18n(); 
const styles = useCssModule('styles');
const currencyStore = useCurrencyStore();
const portfolioStore = usePortfolioStore();

const amountChange = computed(() => {
    return `(${ formatCurrency(portfolioStore.absoluteChange24h) })`;
});

const amountChangeClasses = computed(() => {
    return [styles.amountChange, {
        [styles.green]: portfolioStore.absoluteChange24h > 0,
        [styles.red]: portfolioStore.absoluteChange24h < 0
    }];
});
</script>

<template>
    <div :class="styles.wrap">

        <div :class="styles.text">
            {{ t('commonBalance' ) }}
        </div>

        <div :class="styles.balance">
            <SafeShow>
                <CurrencyNumber
                    :value="portfolioStore.assetsTotalFiat"
                    :currency-code="currencyStore.code"
                    :locale="locale"
                />
            </SafeShow>
        </div>

        <div
            v-if="portfolioStore.absoluteChange24h !== 0"
            :class="styles.dynamics"
        >
            <RelativeChange :value="portfolioStore.relativeChange24h" />

            <div :class="amountChangeClasses">
                {{ amountChange }}
            </div>
        </div>
        
    </div>
</template>

<style lang="scss" module="styles">
@import './HomeBalance.module.scss';
</style>