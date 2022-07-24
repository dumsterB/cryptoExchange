<script setup>
import { useI18n } from 'vue-i18n';
import PortfolioBalance from '@/components/general/balance/PortfolioBalance.vue';
import MenuLink from '@/components/general/MenuLink.vue';
import UserPreview from '@/components/user/preview/UserPreview.vue';
import VIcon from '@/components/common/icon/VIcon.vue';
import { visible as isPromoVisible, hide as hidePromo } from '@/services/cryptoCardPromo';

const { t } = useI18n();
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
            <template #detail="{ balanceClass }">
                <PortfolioBalance :class="balanceClass" />
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