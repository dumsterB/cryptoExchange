<script setup>
import { onMounted, ref } from 'vue';
import AssetChart from '@/components/asset/chart/AssetChart.vue';
import AssetOutput from '@/components/asset/output/AssetOutput.vue';
import AppPopup from '@/components/popup/AppPopup.vue';
import AppPopupClose from '@/components/popup/build/close/AppPopupClose';
import TransactionsBlock from '@/components/asset/transaction/block/TransactionsBlock.vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useChartPopup } from '@/components/asset/chart/hooks/useChartPopup';
import { getAssetInfo } from '@/services/api/repositories/asset';
import { wrappedAsyncFunction } from '@/utils/wrappedFunction';

const { t } = useI18n();
const route = useRoute();

const asset = ref({
    id: '%id%',
    name: '%solana%',
    symbol: '%symbol%',
    chain: '%%chain',
    address: '%address%',
    value: 0,
    price: 0,
    decimals: 0,
    iconUrl: '/'
});
const isAssetLoaded = ref(false);

const transactions = ref([]); // TODO: real data

const { isChartPopupOpen } = useChartPopup(); // TODO: check, use event resize ?
const isChartVisible = window.innerWidth > 1000;

const loadAsset = wrappedAsyncFunction(async () => {
    asset.value = await getAssetInfo(route.params.asset);

    isAssetLoaded.value = true;
});

onMounted(loadAsset);
</script>

<template>
    <div :class="styles.grid">

        <AssetOutput
            :id="asset.id"
            :symbol="asset.symbol"
            :chain="asset.chain"
            :address="asset.address"
            :value="asset.value"
            :price="asset.price"
            :decimals="asset.decimals"
            :icon-url="asset.iconUrl"
            :loading="!isAssetLoaded"
            :class="styles.output"
        />

        <AssetChart
            v-if="isChartVisible"
            :name="asset.name"
            :symbol="asset.symbol"
            :price="asset.price"
            :icon-url="asset.iconUrl"
            :class="styles.chart"
            :padding="{
                top: 20,
                left: 5,
                right: 5,
                bottom: 5
            }"
            :ready="isAssetLoaded"
        />

        <div :class="styles.history">
            <div :class="styles.title">
                {{ t('txHistory') }}
            </div>

            <TransactionsBlock :transactions="transactions" />
        </div>

        <AppPopup
            v-slot="{ close }"
            v-model="isChartPopupOpen"
        >
            <AppPopupClose
                relative
                :class="styles.popupClose"
                @click="close"
            />

            <AssetChart
                :name="asset.name"
                :symbol="asset.symbol"
                :price="asset.price"
                :icon-url="asset.iconUrl"
                :delay="500"
                :padding="{ top: 20, bottom: 10 }"
                mobile
                :ready="isAssetLoaded"
            />
        </AppPopup>

    </div>
</template>

<style lang="scss" module="styles">
@import './AssetView.module.scss';
</style> 