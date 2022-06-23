<script setup>
import { computed, ref, watch } from 'vue';

import AppPopup from '@/components/popup/AppPopup.vue';
import CoinPreview from '@/components/asset/preview/CoinPreview.vue';
import HomeAction from '@/components/home/action/HomeAction.vue';
import HomeBalance from '@/components/home/balance/HomeBalance.vue';
import TabsBlock from '@/components/home/tabs/block/TabsBlock.vue';
import TabsItem from '@/components/home/tabs/item/TabsItem.vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import VSwitch from '@/components/common/switch/VSwitch.vue';
import TransactionsBlock from '@/components/asset/transaction/block/TransactionsBlock.vue';

import { useI18n } from 'vue-i18n';
import { usePopup } from '@/composables/popup/usePopup';
import { useRealtimePortfolioAssetsUpdate, useRealtimePortfolioTransactionsUpdate } from '@/services/api/realtime/portfolio';

const { t } = useI18n();

const TAB_ASSETS_TYPE = 'assets';
const TAB_HISTORY_TYPE = 'history';

const hideSmallBalances = ref(false);

const [ assets ] = useRealtimePortfolioAssetsUpdate();
const [ transactions ] = useRealtimePortfolioTransactionsUpdate();

const filteredAssets = computed(() => {
    return hideSmallBalances.value
        ? assets.value.filter(({ value }) => value > 0)
        : assets.value;
});

const {
    isPopupOpen,
    openPopup,
    closePopup
} = usePopup();

watch(hideSmallBalances, () => {
    if (isPopupOpen.value) {
        closePopup();
    }
});
</script>

<template>
    <HomeBalance />

    <div :class="styles.actions">
        <div :class="styles.actionsWrap">
            <div :class="styles.actionsList">
                <!-- TODO: real url -->
                <HomeAction
                    to="/"
                    icon="card"
                >
                    {{ t('orderCryptoCard') }}
                </HomeAction>

                <HomeAction
                    to="/swap"
                    icon="swap"
                >
                    {{ t('exchangeCurrency') }}
                </HomeAction>

                <HomeAction
                    to="/withdrawal"
                    icon="withdrawal"
                >
                    {{ t('withdrawalCurrency') }}
                </HomeAction>

                <HomeAction
                    to="/deposit"
                    icon="deposit"
                >
                    {{ t('depositAccount') }}
                </HomeAction>
            </div>
        </div>
    </div>

    <TabsBlock :class="styles.tabs">
        <template #head="{ activeTab }">
            <template v-if="activeTab === TAB_ASSETS_TYPE">
                <div :class="styles.balanceControl">
                    <div :class="styles.balanceControlText">
                        {{ t('hideSmallBalances') }}
                    </div>

                    <VSwitch
                        v-model:checked="hideSmallBalances"
                        :class="styles.balanceControlSwitch"
                    />

                    <div
                        :class="styles.balanceControlButton"
                        @click="openPopup"
                    >
                        <VIcon name="dots" />
                    </div>
                </div>

                <AppPopup
                    v-model="isPopupOpen"
                    title="actions"
                >
                    <div :class="styles.popupAction">
                        <div :class="styles.popupActionText">
                            {{ t('hideSmallBalances') }}
                        </div>

                        <VSwitch
                            v-model:checked="hideSmallBalances"
                            :class="styles.popupActionSwitch"
                        />
                    </div>
                </AppPopup>
            </template>
        </template>

        <template #body>
            <TabsItem
                :type="TAB_ASSETS_TYPE"
                title="assets"
            >
                <div :class="styles.tableCols">
                    <div :class="styles.col">
                        {{ t('asset') }}
                    </div>

                    <div :class="styles.col">
                        {{ t('price') }}
                    </div>

                    <div :class="styles.col">
                        {{ t('quantity') }}
                    </div>

                    <div :class="styles.col">
                        {{ t('cost') }}
                    </div>
                </div>

                <CoinPreview
                    v-for="asset in filteredAssets"
                    :key="asset.id"
                    v-bind="asset"
                />
            </TabsItem>

            <TabsItem
                :type="TAB_HISTORY_TYPE"
                title="txHistory"
            >
                <TransactionsBlock :transactions="transactions" />
            </TabsItem>
        </template>
    </TabsBlock>
</template>

<style lang="scss" module="styles">
@import './HomeView.module.scss';
</style>
