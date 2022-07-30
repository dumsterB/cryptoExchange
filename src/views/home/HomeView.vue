<script setup>
import { computed, ref, watch } from 'vue';
import { AppPopup, AppPopupHead, AppPopupBody } from '@/components/Popup';
import { VIcon, VSpin, VSwitch } from '@/uikit';
import TokenPreview from './components/Token/TokenPreview.vue';
import HomeAction from './components/Action/HomeAction.vue';
import HomeBalance from './components/Balance/HomeBalance.vue';
import TabsBlock from './components/Tabs/Block/TabsBlock.vue';
import TabsItem from './components/Tabs/Item/TabsItem.vue';
import { TransactionsBlock } from '@/components/Transaction';
import { useI18n } from 'vue-i18n';
import { usePopup } from '@/hooks/usePopup';
import { usePortfolioTokens } from '@/states/portfolio/hooks/useTokens';

const { tokens, isLoading } = usePortfolioTokens();

// TODO: real txs
const transactions = [];

const { t } = useI18n();
const {
    isPopupOpen,
    openPopup,
    closePopup
} = usePopup();

const hideSmallBalances = ref(false);

const filteredTokens = computed(() => hideSmallBalances.value
    ? tokens.value.filter(({ value }) => value > 0)
    : tokens.value
);

watch(hideSmallBalances, () => {
    if (isPopupOpen.value) {
        closePopup();
    }
});

const TAB_TOKENS_TYPE = 'tokens';
const TAB_HISTORY_TYPE = 'history';
</script>

<template>
    <HomeBalance />

    <div :class="styles.actions">
        <div :class="styles.actionsWrap">
            <div :class="styles.actionsList">
                <HomeAction
                    to="/order-card"
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
            <template v-if="activeTab === TAB_TOKENS_TYPE">
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

                <AppPopup v-model="isPopupOpen">
                    <AppPopupHead>
                        {{ t('actions') }}
                    </AppPopupHead>

                    <AppPopupBody>
                        <div :class="styles.popupAction">
                            <div :class="styles.popupActionText">
                                {{ t('hideSmallBalances') }}
                            </div>

                            <VSwitch
                                v-model:checked="hideSmallBalances"
                                :class="styles.popupActionSwitch"
                            />
                        </div>
                    </AppPopupBody>
                </AppPopup>
            </template>
        </template>

        <template #body>
            <TabsItem
                :type="TAB_TOKENS_TYPE"
                title="assets"
            >
                <div :class="styles.tokens">
                    <VSpin
                        v-if="isLoading"
                        :class="styles.tokensSpin"
                    />
                    
                    <template v-else>
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

                        <TokenPreview
                            v-for="({ id, chain, symbol, value, decimals, price, standard, iconUrl }) in filteredTokens"
                            :id="id"
                            :key="id"
                            :chain="chain"
                            :symbol="symbol"
                            :value="value"
                            :decimals="decimals"
                            :price="price"
                            :standard="standard"
                            :icon-url="iconUrl"
                        />
                    </template>
                </div>
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
