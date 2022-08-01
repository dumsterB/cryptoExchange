<script setup>
import { nextTick, onUnmounted, ref, watch, watchEffect } from 'vue';
import { VIcon, VIconButton } from '@/uikit';
import { CurrencySwitcher } from '@/components/Currency';
import { VerificationStatus } from '@/components/User';
import UserMenu from '../User/UserMenu.vue';
import MenuLink from '../Link/MenuLink.vue';
import { navLinks } from '../config';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useUserStore } from '@/states/user/store';
import { useCryptoCard } from '@/states/cryptoCard/hooks';

const props = defineProps({
    visible: Boolean
});

const emit = defineEmits({
    'update:visible': null,
    'open-settings': null
});

const { t } = useI18n();
const route = useRoute();
const userStore = useUserStore();
const { disableBodyScroll, enableBodyScroll } = useScrollLock();
const { isVisible: isCryptoCardVisible, ...cryptoCard } = useCryptoCard({ shortDescription: true });

const links = navLinks(t, { buyButton: true });

const menu = ref(null);
const close = () => emit('update:visible', false);

watch(route, close);

watchEffect(() => {
    if (!menu.value)
        return;
        
    if (props.visible) {
        nextTick(() => disableBodyScroll(menu.value));
    } else {
        enableBodyScroll(menu.value);
    }
});

onUnmounted(() => enableBodyScroll(menu.value));

const handleSettingButtonClick = () => emit('open-settings');
</script>

<template>
    <Teleport to="body">
        <Transition
            name="menu-appear"
            duration="150"
        >
            <div
                v-if="visible"
                ref="menu"
                :class="styles.menu"
            >

                <div
                    :class="styles.overlay"
                    @click="close"
                />

                <div :class="styles.box">
                    <div :class="styles.content">
                        <div>
                            <div :class="styles.head">
                                <RouterLink
                                    to="/"
                                    :class="styles.logo"
                                >
                                    <VIcon name="logo" />
                                </RouterLink>

                                <VIconButton @click="close">
                                    <VIcon name="close" />
                                </VIconButton>
                            </div>

                            <UserMenu
                                mobile
                                :class="styles.user"
                            >
                                <VerificationStatus :completed="userStore.user.verification.verified" />
                            </UserMenu>

                            <div :class="styles.links">
                                <MenuLink
                                    v-for="({ url, icon, text }) in links"
                                    :key="url"
                                    :to="url"
                                    :icon="icon"
                                >
                                    {{ text }}
                                </MenuLink>
                            </div>
                        </div>

                        <div>
                            <RouterLink
                                v-if="isCryptoCardVisible"
                                :to="cryptoCard.url"
                                :class="styles.promo"
                            >
                                <div :class="styles.promoImage" />

                                <div
                                    :class="styles.promoClose"
                                    @click="cryptoCard.hide"
                                >
                                    <VIcon name="close-xs" />
                                </div>

                                <div :class="styles.promoTitle">
                                    {{ t(cryptoCard.title) }}
                                </div>

                                <div :class="styles.promoText">
                                    {{ t(cryptoCard.description) }}
                                </div>
                            </RouterLink>

                            <div :class="styles.bottom">
                                <CurrencySwitcher popup-open />

                                <VIconButton @click="handleSettingButtonClick">
                                    <VIcon name="settings" />
                                </VIconButton>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss" module="styles">
@import './MobileMenu.module.scss';
</style>
