<script setup>
import { computed, ref, useAttrs, useCssModule } from 'vue';
import { VAvatar, VIcon } from '@/uikit';
import { AppPopup, AppPopupHead } from '@/components/Popup';
import { VerificationStatus } from '@/components/User';
import MenuLink from '../Link/MenuLink.vue';
import { logout } from '@/states/user/services/logout';
import { useI18n } from 'vue-i18n';
import { usePopup } from '@/hooks/usePopup';
import { useUserStore } from '@/states/user/store';
import { userLinks } from '../config';

defineProps({
    mobile: Boolean // mobile version with dots
});

const { t } = useI18n();
const attrs = useAttrs();
const styles = useCssModule('styles');

const {
    isMenuOpen,
    openMenu,
    closeMenu
} = usePopup('Menu');

const user = ref(null);
const userStore = useUserStore();
const userClasses = computed(() => [
    styles.user,
    styles.button,
    { [styles.opened]: isMenuOpen.value }
]);

const links = userLinks(
    t,
    userStore.user.verification.verified,
    closeMenu
);

// TODO: real logout
const handleLogout = () => logout();
</script>

<template>
    <button
        ref="user"
        v-bind="attrs"
        :class="userClasses"
        @click="openMenu"
    >
        <div :class="styles.userContent">
            <VAvatar :image="userStore.user.avatar" />

            <div :class="styles.userDetails">
                <div :class="styles.userName">
                    {{ userStore.user.name }} {{ userStore.user.surname }}
                </div>

                <slot />
            </div>
        </div>

        <div
            v-if="mobile"
            :class="styles.userDots"
        >
            <VIcon name="dots" />
        </div>
        <div
            v-else
            :class="styles.userArrow"
        >
            <VIcon name="arrow-down" />
        </div>
    </button>

    <AppPopup
        v-model="isMenuOpen"
        view="pane"
        :pane-activator="user"
    >
        <div :class="styles.menu">
            <AppPopupHead v-if="mobile">
                {{ t('account') }}
            </AppPopupHead>

            <div
                v-else
                :class="styles.user"
            >
                <div :class="styles.userContent">
                    <VAvatar :image="userStore.user.avatar" />

                    <div :class="styles.userDetails">
                        <div :class="styles.userName">
                            {{ userStore.user.name }} {{ userStore.user.surname }}
                        </div>

                        <VerificationStatus :completed="userStore.user.verification.verified" />
                    </div>
                </div>
            </div>

            <div :class="styles.menuLinks">
                <MenuLink
                    v-for="({ url, icon, text, onClick }) in links"
                    :key="url"
                    :to="url"
                    :icon="icon"
                    :class="styles.menuLink"
                    @click="onClick"
                >
                    {{ text }}
                </MenuLink>

                <MenuLink
                    icon="logout"
                    :class="styles.menuLogout"
                    @click="handleLogout"
                >
                    {{ t('logout') }}
                </MenuLink>
            </div>
        </div>
    </AppPopup>
</template>

<style lang="scss" module="styles">
@import './UserMenu.module.scss';
</style>