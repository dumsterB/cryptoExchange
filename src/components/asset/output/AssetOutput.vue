<script setup>
import { computed, ref } from 'vue';
import AssetIcon from '../icon/AssetIcon.vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import SafeShow from '../show/SafeShow.vue';
import TooltipBox from '@/components/general/tooltip/TooltipBox';
import SkeletonBox from '@/components/general/skeleton/SkeletonBox';
import { useI18n } from 'vue-i18n';
import { useClipboard } from '@/hooks/helpers/useClipboard'; 
import { useCurrencyFormat } from '@/utils/format/currency';
import { formatCoinQuantity } from '@/utils/format/coin';
import { formatAddressToShort } from '@/utils/format/address';

// TODO: prepare for fiat
const props = defineProps({
    symbol: {
        type: String,
        required: true
    },
    chain: {
        type: [String, null],
        default: null
    },
    address: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    decimals: {
        type: Number,
        default: 16
    },
    iconUrl: {
        type: String,
        required: true
    },
    loading: Boolean
});

const { t } = useI18n();
const { formatCurrency } = useCurrencyFormat();

const quantity = computed(() => props.loading
    ? null
    : `${ formatCoinQuantity(props.value, props.decimals) }`
);

const conversion = computed(() => props.loading
    ? null
    : formatCurrency(props.price * props.value)
);

const shortAddress = computed(() => props.loading
    ? null
    : formatAddressToShort(props.address)
);

const {
    isCopied,
    isCopySupported,
    copyToClipboard
} = useClipboard();

const isTooltipVisible = ref(false);

const tooltipContent = computed(() => isCopied.value
    ? t('copied')
    : t('copy')
);

const showTooltip = () => isTooltipVisible.value = true;
const hideTooltip = () => isTooltipVisible.value = false;
</script>

<template>
    <div :class="styles.output">

        <div :class="styles.head">
            <SkeletonBox
                v-if="loading"
                :class="styles.assetSkeleton"
            />
            <div
                v-else
                :class="styles.asset"
            >
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
                <SkeletonBox
                    v-if="loading"
                    :class="styles.addressSkeleton"
                />
                <TooltipBox
                    v-else
                    :show="isTooltipVisible"
                    placement="top"
                    arrow
                >
                    <button
                        :class="styles.address"
                        @mouseenter="showTooltip"
                        @mouseleave="hideTooltip"
                        @touchstart="showTooltip"
                        @touchend="hideTooltip"
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

                    <template #content>
                        {{ tooltipContent }}
                    </template>
                </TooltipBox>

                <SkeletonBox
                    v-if="loading"
                    :class="styles.balanceSkeleton"
                />
                <div
                    v-else
                    :class="styles.balance"
                >
                    <SafeShow>
                        {{ quantity }} <span>{{ symbol }}</span>
                    </SafeShow>
                </div>

                <SkeletonBox
                    v-if="loading"
                    :class="styles.conversionSkeleton"
                />
                <div
                    v-else
                    :class="styles.conversion"
                >
                    <SafeShow>
                        ≈ {{ conversion }}
                    </SafeShow>
                </div>
            </div>
        </div>

        <div :class="styles.actions">
            <!-- TODO: real url -->
            <div :class="styles.action">
                <SkeletonBox
                    v-if="loading"
                    :class="styles.actionSkeleton"
                />
                <RouterLink
                    v-else
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
                <SkeletonBox
                    v-if="loading"
                    :class="styles.actionSkeleton"
                />
                <RouterLink
                    v-else
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
                <SkeletonBox
                    v-if="loading"
                    :class="styles.actionSkeleton"
                />
                <RouterLink
                    v-else
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