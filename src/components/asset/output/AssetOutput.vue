<script setup>
import { computed } from 'vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import { useClipboard } from '@/hooks/helpers/useClipboard'; 
import { useCurrencyFormat } from '@/utils/format/currency';
import { formatCoinQuantity } from '@/utils/format/coin';
import { formatAddressToShort } from '@/utils/format/address';
import { useI18n } from 'vue-i18n';
import AssetIcon from '../icon/AssetIcon.vue';
import SafeShow from '../show/SafeShow.vue';

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    chain: {
        type: [String, null],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    decimals: {
        type: Number,
        default: 12
    },
    price: {
        type: Object,
        required: true,
        default: () => ({
            value: 0,
            relativeChange24h: 0
        })
    },
    iconUrl: {
        type: String,
        required: true
    }
});

const { t } = useI18n();
const { formatCurrency } = useCurrencyFormat();

const quantity = computed(() => {
    return `${ formatCoinQuantity(props.value, props.decimals) } ${ props.symbol }`;
});

const conversion = computed(() => {
    return formatCurrency(props.price.value * props.value);
});

const shortAddress = computed(() => {
    return formatAddressToShort(props.address);
});

const {
    isCopySupported,
    // isCopiedToClipboard,
    copyToClipboard
} = useClipboard();
</script>

<template>
    <div :class="styles.output">

        <div :class="styles.head">
            <div :class="styles.asset">
                <AssetIcon
                    :src="iconUrl"
                    size="s"
                />

                <div :class="styles.assetName">
                    {{ symbol }} <span v-if="chain">({{ chain }})</span>
                </div>
            </div>
        </div>

        <div :class="styles.info">
            <!-- TODO: tooltip -->
            <div :class="styles.infoContent">
                <button
                    :class="styles.address"
                    @click="copyToClipboard(address)"
                >
                    <span :class="styles.addressText">
                        {{ shortAddress }}
                    </span>

                    <span
                        v-if="isCopySupported"
                        :class="styles.addressIcon"
                    >
                        <VIcon name="copy" />
                    </span>
                </button>

                
                <div :class="styles.balance">
                    <SafeShow>
                        {{ quantity }}
                    </SafeShow>
                </div>

                <div :class="styles.conversion">
                    <SafeShow>
                        ≈ {{ conversion }}
                    </SafeShow>
                </div>
            </div>
        </div>

        <div :class="styles.actions">
            <!-- TODO: real url -->
            <div :class="styles.action">
                <RouterLink
                    to="/"
                    :class="styles.actionWrap"
                >
                    <div :class="styles.actionIcon">
                        <VIcon name="swap" />
                    </div>

                    <div :class="styles.actionText">
                        {{ t('doSwap') }}
                    </div>
                </RouterLink>
            </div>

            <div :class="styles.action">
                <RouterLink
                    to="/"
                    :class="styles.actionWrap"
                >
                    <div :class="styles.actionIcon">
                        <VIcon name="deposit" />
                    </div>

                    <div :class="styles.actionText">
                        {{ t('doDeposit') }}
                    </div>
                </RouterLink>
            </div>

            <div :class="styles.action">
                <RouterLink
                    to="/"
                    :class="styles.actionWrap"
                >
                    <div :class="styles.actionIcon">
                        <VIcon name="withdrawal" />
                    </div>

                    <div :class="styles.actionText">
                        {{ t('doWithdrawal') }}
                    </div>
                </RouterLink>
            </div>
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './AssetOutput.module.scss';
</style> 