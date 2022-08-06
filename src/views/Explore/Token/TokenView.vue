<script setup>
import { computed } from 'vue';
import { AppPopup, AppPopupClose } from '@/components/Popup';
import { TokenChart } from '@/components/Token';
import { TransactionsBlock } from '@/components/Transaction';
import TokenOutput from './components/Output/TokenOutput.vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useFetch } from '@/hooks/useFetch';
import { useTokenPrice } from '@/states/token/hooks/useTokenPrice';
import { useChartPopup } from '@/states/token/hooks/useChartPopup';
import { fetchUserToken, userTokenState } from '@/states/token/fetch/fetchUserToken';

const { t } = useI18n();
const route = useRoute();

// route param
const tokenId = computed(() => route.params.token);

// token data
const { price } = useTokenPrice(tokenId.value);
const { data: token, isLoading } = useFetch('userToken', () => fetchUserToken(tokenId.value), userTokenState);

const { isOpen: isChartPopupOpened } = useChartPopup();

const address = '0x23'; // TODO: remove and use token
const transactions = []; // TODO: real txs
</script>

<template>
    <div :class="styles.grid">
        <TokenOutput
            :id="token.id"
            :symbol="token.symbol"
            :chain="token.chain"
            :address="address"
            :value="token.value"
            :price="price"
            :decimals="token.decimals"
            :icon-url="token.iconUrl"
            :loading="isLoading"
            :class="styles.output"
        />

        <TokenChart
            :id="token.id"
            :name="token.name"
            :symbol="token.symbol"
            :price="price"
            :icon-url="token.iconUrl"
            :padding-top="20"
            :class="styles.chart"
        />

        <div :class="styles.history">
            <div :class="styles.title">
                {{ t('txHistory') }}
            </div>

            <TransactionsBlock :transactions="transactions" />
        </div>

        <AppPopup
            v-slot="{ close }"
            v-model="isChartPopupOpened"
        >
            <AppPopupClose
                relative
                :class="styles.popupClose"
                @click="close"
            />

            <TokenChart
                :id="token.id"
                :name="token.name"
                :symbol="token.symbol"
                :price="token.price"
                :icon-url="token.iconUrl"
                :delay="500"
                :padding-top="20"
                mobile
            />
        </AppPopup>

    </div>
</template>

<style lang="scss" module="styles">
@import './TokenView.module.scss';
</style> 