<script setup>
import { VIcon } from '@/uikit';
import { CurrencyNumber, SafeShow } from '@/components/Currency';
import MenuLink from '../Link/MenuLink.vue';
import UserMenu from '../User/UserMenu.vue';
import { navLinks } from '../config';
import { useI18n } from 'vue-i18n';
import { useCryptoCard } from '@/states/cryptoCard/hooks';
import { useCurrencyStore } from '@/states/currency/store';
import { usePortfolioStore } from '@/states/portfolio/store';

const { t, locale } = useI18n();
const currencyStore = useCurrencyStore();
const portfolioStore = usePortfolioStore();
const { isVisible: isCryptoCardVisible, ...cryptoCard } = useCryptoCard();

const links = navLinks(t);
</script>

<template>
    <div :class="styles.sidebar">

        <div :class="styles.logo">
            <RouterLink
                to="/"
                :class="styles.logoLink"
            >
                <VIcon name="logo" />
            </RouterLink>
        </div>

        <UserMenu :class="styles.user">
            <SafeShow>
                <CurrencyNumber
                    :value="portfolioStore.assetsTotalFiat"
                    :currency-code="currencyStore.code"
                    :locale="locale"
                    :class="styles.userBalance"
                />
            </SafeShow>
        </UserMenu>

        <div>
            <MenuLink
                v-for="({ url, icon, text }) in links"
                :key="url"
                :to="url"
                :icon="icon"
            >
                {{ text }}
            </MenuLink>
        </div>

        <RouterLink
            v-if="isCryptoCardVisible"
            :to="cryptoCard.url"
            :class="styles.promo"
        >
            <div :class="styles.promoCard" />

            <div :class="styles.promoWrap">
                <div 
                    :class="styles.promoClose"
                    @click.prevent="cryptoCard.hide"
                >
                    <VIcon name="close-xs" />
                </div>

                <div :class="styles.promoTitle">
                    {{ t(cryptoCard.title) }}
                </div>

                <div :class="styles.promoText">
                    {{ t(cryptoCard.description) }}
                </div>
            </div>
        </RouterLink>

    </div>
</template>

<style lang="scss" module="styles">
@import './TheSidebar.module.scss';
</style>