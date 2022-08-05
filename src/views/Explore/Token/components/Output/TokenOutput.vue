<script setup>
import { computed } from 'vue';
import { VIcon, VSkeletonLoader } from '@/uikit';
import { SafeShow } from '@/components/Currency';
import { TokenIcon } from '@/components/Token';
import { CopyButton } from '@/components/CopyButton';
import { useI18n } from 'vue-i18n';
import { useCurrencyStore } from '@/states/currency/store.js';
import { formatCurrency } from '@/utils/currency';
import { formatTokenQuantity } from '@/utils/token';
import { ellipseAddress } from '@/utils/addressFormat';

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
    : `${ formatTokenQuantity(props.value, props.decimals) }`
);

const conversion = computed(() => props.loading
    ? null
    : formatCurrency(props.price * props.value, locale.value, currencyStore.code)
);

const shortAddress = computed(() => props.loading
    ? null
    : ellipseAddress(props.address)
);
</script>

<template>
    <div :class="styles.output">

        <div :class="styles.head">
            <VSkeletonLoader
                v-if="loading"
                :class="styles.assetSkeleton"
            />
            <div
                v-else
                :class="styles.asset"
            >
                <TokenIcon
                    :image="iconUrl"
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
                <VSkeletonLoader
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

                <VSkeletonLoader
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

                <VSkeletonLoader
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
                <VSkeletonLoader
                    v-if="loading"
                    :class="styles.actionSkeleton"
                />
                <RouterLink
                    v-else
                    :to="{path: '/swap', query: { output: props.id }}"
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
                <VSkeletonLoader
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
                <VSkeletonLoader
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
@import './TokenOutput.module.scss';
</style> 