<script setup>
import { computed, ref, useAttrs, useCssModule } from 'vue';
import { useI18n } from 'vue-i18n';
import AppPopup from '@/components/popup/AppPopup.vue';
import MenuLink from '@/components/general/MenuLink.vue';
import VerificationStatus from '@/components/user/verification/status/VerificationStatus.vue';
import { useUserStore } from '@/stores/user';
import { logout } from '@/services/auth/logout';

const styles = useCssModule('styles');
const attrs = useAttrs();
const { t } = useI18n();
const userStore = useUserStore();

const user = ref(null);
const userClasses = computed(() => {
    return [
        styles.user,
        styles.button,
        {
            [styles.active]: isDropdownVisible.value
        }
    ];
});

const avatarStyles = computed(() => {
    return {
        backgroundImage: `url(${ userStore.user.avatar })`
    };
});

const isDropdownVisible = ref(false);

const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
};

const onMenuLinkClick = () => {
    isDropdownVisible.value = false;
};
</script>

<template>
    <button
        ref="user"
        :class="userClasses"
        v-bind="attrs"
        @click="toggleDropdown"
    >
        <div :class="styles.userContent">
            <div
                :class="styles.userAvatar"
                :style="avatarStyles"
            />

            <div :class="styles.userDetails">
                <div :class="styles.userName">
                    {{ userStore.user.name }}
                </div>

                <slot
                    name="detail"
                    :balance-class="styles.userBalance"
                />
            </div>
        </div>

        <slot
            name="button"
            :arrow-class="styles.userArrow"
            :dots-class="styles.userDots"
        />
    </button>

    <AppPopup
        v-model="isDropdownVisible"
        view="pane"
        :pane-activator="user"
    >
        <div :class="styles.dropdown">
            <div :class="[styles.user, styles.userPane]">
                <div :class="styles.userContent">
                    <div
                        :class="styles.userAvatar"
                        :style="avatarStyles"
                    />

                    <div :class="styles.userDetails">
                        <div :class="styles.userName">
                            {{ userStore.user.name }}
                        </div>

                        <VerificationStatus />
                    </div>
                </div>
            </div>

            <!-- TODO: real urls -->
            <MenuLink
                v-if="!userStore.isVerified"
                to="/kyc"
                icon="verification"
                :class="styles.dropdownLink"
                @click="onMenuLinkClick"
            >
                {{ t('verification') }}
            </MenuLink>

            <!-- <MenuLink
                to="/settings/name"
                icon="edit"
                :class="styles.dropdownLink"
            >
                {{ t('editName') }}
            </MenuLink> -->
            <!-- 
            <MenuLink
                to="/history"
                icon="history"
                :class="styles.dropdownLink"
            >
                {{ t('txs') }}
            </MenuLink> -->

            <MenuLink
                to="/affiliate"
                icon="affiliate"
                :class="styles.dropdownLink"
                @click="onMenuLinkClick"
            >
                {{ t('affiliateProgram') }}
            </MenuLink>

            <!-- TODO: loading state ??? -->
            <MenuLink
                icon="logout"
                :class="styles.dropdownLogout"
                @click="logout"
            >
                {{ t('logout') }}
            </MenuLink>
        </div>
    </AppPopup>
</template>

<style lang="scss" module="styles">
@import './UserPreview.module.scss';
</style>
