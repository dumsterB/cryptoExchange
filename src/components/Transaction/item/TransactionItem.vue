<script setup>
// import { computed } from 'vue';
// import { TokenIcon } from '@/components/Token';
// import { SafeShow } from '@/components/Currency';
// import { VIcon } from '@/uikit';
// import { getTransactionTypeName } from '@/services/asset/transaction';
// import { formatTsToTime } from '@/utils/format/date';
// import { formatCoinQuantity } from '@/utils/format/coin';
// import { useI18n } from 'vue-i18n';
// import { useChainsStore } from '@/stores/chains';

const props = defineProps({
    hash: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    assetFrom: {
        type: Object,
        required: true,
        default: () => ({
            id: '%id%',
            name: '%name%',
            symbol: '%symbol%',
            decimals: 2,
            chain: null,
            iconUrl: '%iconUrl%',
            value: 0,
            price: 0,
        })
    },
    assetTo: {
        type: Object,
        required: true,
        default: () => ({
            id: '%id%',
            name: '%name%',
            symbol: '%symbol%',
            decimals: 2,
            chain: null,
            iconUrl: '%iconUrl%',
            value: 0,
            price: 0,
        })
    },
    fee: {
        type: Object,
        required: true,
        default: () => ({
            value: 0,
            price: 0
        })
    },
    meta: {
        type: Object,
        default: () => ({})
    },
    addressFrom: {
        type: [String, null],
        required: true
    },
    addressTo: {
        type: [String, null],
        required: true
    },
    status: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

// const { t } = useI18n();

// const assetFrom = computed(() => {
//     const { value, decimals, chain } = props.assetFrom;

//     return chain
//         ? formatCoinQuantity(value, decimals)
//         : value;
// });

// const assetTo = computed(() => {
//     const  { value, decimals, chain } = props.assetTo;

//     return chain
//         ? formatCoinQuantity(value, decimals)
//         : value;
// });

// const chainStore = useChainsStore();

// const chainFrom = computed(() => {
//     return chainStore.chains.find(
//         chain => chain.id === props.assetFrom.chain
//     );
// });

// const chainTo = computed(() => {
//     return chainStore.chains.find(
//         chain => chain.id === props.assetTo.chain
//     );
// });

// const typeName = computed(() => {
//     return getTransactionTypeName(props.type);
// });
</script>

<template>
    <div :class="styles.transaction">
        <div :class="styles.wrap">

            {{ props }}

            <!-- <div :class="styles.type">
                <div :class="styles.typeIcon">
                    <VIcon :name="type" />
                </div>

                <div :class="styles.typeContent">
                    <div :class="styles.typeName">
                        {{ typeName }}
                    </div>

                    <div :class="styles.time">
                        {{ formatTsToTime(timestamp) }}
                    </div>
                </div>
            </div>

            <div :class="styles.asset">
                <AssetIcon
                    :src="props.assetFrom.iconUrl"
                    :class="styles.assetIcon"
                />

                <div :class="styles.assetContent">
                    <div :class="styles.assetValue">
                        <SafeShow>
                            {{ assetFrom }}
                        </SafeShow>
                    </div>
                    <div :class="styles.assetName">
                        {{ props.assetFrom.symbol }} <span v-if="chainFrom">({{ chainFrom.symbol }})</span>
                    </div>
                </div>
            </div>

            <div :class="styles.arrow">
                <VIcon name="arrow-direction" />
            </div>

            <div :class="styles.asset">
                <AssetIcon
                    :src="props.assetTo.iconUrl"
                    :class="styles.assetIcon"
                />

                <div :class="styles.assetContent">
                    <div :class="styles.assetValue">
                        <SafeShow>
                            {{ assetTo }}
                        </SafeShow>
                    </div>
                    <div :class="styles.assetName">
                        {{ props.assetTo.symbol }} <span v-if="chainTo">({{ chainTo.symbol }})</span>
                    </div>
                </div>
            </div>

            <div :class="styles.gas">
                <div :class="styles.gasText">
                    {{ t('gas') }}
                </div>

                <div :class="styles.gasPrice">
                    <SafeShow>
                        {{ formatCurrency(props.fee.price) }}
                    </SafeShow>
                </div>
            </div> -->

        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './TransactionItem.module.scss';
</style>