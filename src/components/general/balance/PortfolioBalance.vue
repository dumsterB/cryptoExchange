<script setup>
import { computed } from 'vue'
import SafeShow from '@/components/asset/show/SafeShow.vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { useCurrencyFormat, decomposeCurrency } from '@/utils/format/currency'

const portfolioStore = usePortfolioStore();
const { formatCurrency } = useCurrencyFormat();

const balanceParts = computed(() => {
    const balance = formatCurrency(portfolioStore.assetsTotalFiat);

    return decomposeCurrency(balance);
});
</script>

<template>
    <div :class="styles.balance">
        <SafeShow>

            <span :class="styles.amount">
                {{ balanceParts.currency }} {{ balanceParts.integer }}
            </span>

            <span :class="styles.ghost">
                {{ balanceParts.separator }}
            </span>

            <span :class="styles.ghost">
                {{ balanceParts.decimal }}
            </span>

        </SafeShow>
    </div>
</template>

<style lang="scss" module="styles">
@import './PortfolioBalance.module.scss';
</style>