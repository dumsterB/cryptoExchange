<script setup>
import { useI18n } from 'vue-i18n';
// import PortfolioBalance from '@/components/general/balance/PortfolioBalance.vue';
import MenuLink from '@/components/general/MenuLink.vue';
import UserPreview from '@/components/user/preview/UserPreview.vue';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';
import CurrencyNumber from '@/2v/entities/currency/components/number/CurrencyNumber';
import SafeShow from '@/components/asset/show/SafeShow.vue';
import { visible as isPromoVisible, hide as hidePromo } from '@/services/cryptoCardPromo';
import { useCurrencyStore } from '@/2v/entities/currency/store/currency';
import { usePortfolioStore } from '@/stores/portfolio';

const { t, locale } = useI18n();
const currencyStore = useCurrencyStore();
const portfolioStore = usePortfolioStore();
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
    
        <UserPreview :class="styles.user">
            <template #detail>
                <div :class="styles.userBalance">
                    <SafeShow>
                        <CurrencyNumber
                            :value="portfolioStore.assetsTotalFiat"
                            :currency-code="currencyStore.code"
                            :locale="locale"
                        />
                    </SafeShow>
                </div>
            </template>

            <template #button="{ arrowClass }">
                <div :class="arrowClass">
                    <VIcon name="arrow-down" />
                </div>
            </template>
        </UserPreview>

        <div>
            <MenuLink
                to="/"
                icon="house"
            >
                {{ t('house') }}
            </MenuLink>

            <MenuLink
                to="/swap"
                icon="swap"
            >
                {{ t('swap') }}
            </MenuLink>

            <MenuLink
                to="/deposit"
                icon="deposit"
            >
                {{ t('deposit') }}
            </MenuLink>

            <MenuLink
                to="/withdrawal"
                icon="withdrawal"
            >
                {{ t('withdrawal') }}
            </MenuLink>
        </div>

        <!-- TODO: real url -->
        <RouterLink
            v-if="isPromoVisible"
            to="/"
            :class="styles.promo"
        >
            <div :class="styles.promoCard" />

            <div :class="styles.promoWrap">

                <div 
                    :class="styles.promoClose"
                    @click.prevent="hidePromo"
                >
                    <VIcon name="close-xs" />
                </div>

                <div :class="styles.promoTitle">
                    {{ t('cryptoCardPromo.title') }}
                </div>

                <div :class="styles.promoText">
                    {{ t('cryptoCardPromo.text') }}
                </div>

            </div>
        </RouterLink>

    </div>
</template>

<style lang="scss" module="styles">
@import './TheSidebar.module.scss';
</style>