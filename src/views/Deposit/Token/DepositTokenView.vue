<script setup>
import { computed, onBeforeMount, ref, watchEffect } from 'vue';
import { VAlert, VIcon, VSpin, VTooltip } from '@/uikit';
import TokenQrCode from './components/QrCode/TokenQrCode.vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useFetch } from '@/hooks/useFetch';
import { useClipboard } from '@/hooks/useClipboard';
import { fetchUserToken } from '@/states/token/fetch/fetchUserToken';
import { getTokenFullName, getTokenNetwork } from '@/utils/token';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const tokenId = ref(route.query.output);

watchEffect(() => {
    if (!tokenId.value) {
        router.replace({ query: { output: 'bitcoin' }});
    }
});

const { data: token, isLoading } = useFetch(
    'userToken',
    () => fetchUserToken(tokenId.value)
);

const title = computed(() => token && t('assetAccount', {
    asset: getTokenFullName(
        token.value.symbol,
        token.value.chain,
        token.value.standard
    )
}));

const network = computed(() => token && getTokenNetwork(
    token.value.chain,
    token.value.standard
));

onBeforeMount(() => {
    // TODO: move to config
    if (!tokenId.value) {
        tokenId.value = 'bitcoin';
    }
});

// TODO: refactoring to component. Another one on asset page
const { isCopied, isCopySupported, copyToClipboard } = useClipboard();

const isTooltipVisible = ref(false);
const tooltipContent = computed(() => isCopied.value
    ? t('copied')
    : t('copy')
);

const showTooltip = () => isTooltipVisible.value = true;
const hideTooltip = () => isTooltipVisible.value = false;
</script>

<template>
    <div
        v-if="isLoading"
        :class="styles.loader"
    >
        <VSpin />
    </div>
    <div
        v-else
        :class="styles.wrap"
    >
        <!-- TODO: select -->
        <div :class="styles.head">
            <div :class="styles.asset">
                {{ title }}
            </div>
        </div>

        <TokenQrCode
            v-if="token.address && token.iconUrl"
            ref="qrcode"
            :logo="token.iconUrl"
            :address="token.address"
            :class="styles.qrCode"
        />

        <div :class="styles.address">
            <div :class="styles.addressLabel">
                {{ t('addressForDeposit') }}
            </div>

            <VTooltip
                v-if="isCopySupported"
                :show="isTooltipVisible"
                placement="top"
            >
                <div
                    :class="styles.addressValue"
                    @mouseenter="showTooltip"
                    @mouseleave="hideTooltip"
                    @touchstart="showTooltip"
                    @click="copyToClipboard(token.address)"
                >
                    <span :class="styles.addressText">{{ token.address }}</span>
                    <span :class="styles.addressCopy"><VIcon name="copy" /></span>
                </div>

                <template #content>
                    {{ tooltipContent }}
                </template>
            </VTooltip>
            <div
                v-else
                :class="styles.addressValue"
            >
                <span :class="styles.addressText">{{ asset.address }}</span>
            </div>
        </div>

        <VAlert :class="styles.alert">
            <template #icon>
                <VIcon name="info" />
            </template>

            <div :class="styles.warning">
                1. {{ t('addressOnlyFor', { asset: token.symbol }) }}
            </div>
            <div
                v-if="token.chain"
                :class="styles.warning"
            >
                2. {{ t('checkNetwork') }} <span>{{ network }}</span>
            </div>
        </VAlert>
    </div>
</template>

<style lang="scss" module="styles">
@import './DepositTokenView.module.scss';
</style>