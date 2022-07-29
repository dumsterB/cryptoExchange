<script setup>
import { computed, watchEffect } from 'vue';
import AssetIcon from '../icon/AssetIcon.vue';
import CopyButton from '@/2v/shared/components/copy/CopyButton.vue';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';
import SafeShow from '../show/SafeShow.vue';
import SkeletonBox from '@/components/general/skeleton/SkeletonBox';
import { useI18n } from 'vue-i18n';
import { formatCurrency } from '@/2v/entities/currency/utils/format';
import { formatCoinQuantity } from '@/utils/format/coin';
import { formatAddressToShort } from '@/utils/format/address';
import { useCurrencyStore } from '@/2v/entities/currency/store/currency';

// TODO: prepare for fiat
const props = defineProps({
    id: {
        type: String,
        required: true
    },
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

const { t, locale } = useI18n();
const currencyStore = useCurrencyStore();

const quantity = computed(() => props.loading
    ? null
    : `${ formatCoinQuantity(props.value, props.decimals) }`
);

const conversion = computed(() => props.loading
    ? null
    : formatCurrency(props.price * props.value, locale.value, currencyStore.code)
);

watchEffect(() => console.log(props.price, props.value, locale.value, currencyStore.code));

const shortAddress = computed(() => props.loading
    ? null
    : formatAddressToShort(props.address)
);
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
                    {{ symbol }} <span v-if="chain">({{ chain.toUpperCase() }})</span>
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
                <CopyButton
                    v-else
                    v-slot="{ isCopySupported }"
                    :value="address"
                    :class="styles.address"
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
                </CopyButton>

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
                    :to="`/deposit/${ id }`"
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
                    :to="`/withdrawal/${ id }`"
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