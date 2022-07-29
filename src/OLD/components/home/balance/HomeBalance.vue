<script setup>
import { computed, useCssModule } from 'vue';
import PercentChange from '@/components/general/percent/PercentChange.vue';
import CurrencyNumber from '@/2v/entities/currency/components/number/CurrencyNumber';
import SafeShow from '@/components/asset/show/SafeShow.vue';
import { formatCurrency } from '@/2v/entities/currency/utils/format';
import { useI18n } from 'vue-i18n';
import { usePortfolioStore } from '@/stores/portfolio';
import { useCurrencyStore } from '@/2v/entities/currency/store/currency';

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
            <PercentChange :value="portfolioStore.relativeChange24h" />

            <div :class="amountChangeClasses">
                {{ amountChange }}
            </div>
        </div>
        
    </div>
</template>

<style lang="scss" module="styles">
@import './HomeBalance.module.scss';
</style>