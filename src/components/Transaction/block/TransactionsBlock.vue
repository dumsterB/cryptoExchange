<script setup>
import { EmptyPlaceholder } from '@/uikit';
import TransactionGroup from '../group/TransactionGroup.vue';
import TransactionItem from '../item/TransactionItem.vue';

defineProps({
    transactions: {
        type: Array,
        default: () => ([])
    }
});
</script>

<template>
    <div v-if="transactions.length">
        <TransactionGroup
            v-for="({ dayTs, txs }) in transactions"
            :key="dayTs"
            :day-ts="dayTs"
        >
            <TransactionItem
                v-for="({ id, ...tx }) in txs"
                :key="id"
                v-bind="tx"
            />
        </TransactionGroup>
    </div>

    <EmptyPlaceholder :class="styles.placeholder" />
</template>

<style lang="scss" module="styles">
@import './TransactionsBlock.module.scss';
</style> 