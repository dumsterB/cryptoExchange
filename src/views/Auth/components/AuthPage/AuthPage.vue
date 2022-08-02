<script setup>
import { computed } from 'vue';
import { VIcon } from '@/uikit';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    action: {
        type: String,
        required: true,
        validator(action) {
            return ['register', 'login'].includes(action);
        }
    }
});

const sideText = computed(() => props.action === 'register'
    ? 'hadRegister'
    : 'noRegistered');

const sideLink = computed(() => props.action === 'register'
    ? {
        url: '/login',
        text: 'login'
    }
    : {
        url: '/register',
        text: 'register'
    });

const { t } = useI18n();
</script>

<template>
    <div :class="styles.container">

        <div :class="styles.promo">
            <div :class="styles.promoPhone" />
        </div>

        <div :class="styles.content">

            <div :class="styles.form">
                <div :class="styles.logoSign">
                    <VIcon name="logo-sign" />
                </div>

                <div :class="styles.title">
                    <slot name="title" />
                </div>

                <slot name="content" />

                <div :class="styles.side">
                    <span :class="styles.sideText">
                        {{ t(sideText) }}
                    </span>
                    
                    <RouterLink
                        :to="sideLink.url"
                        :class="styles.sideLink"
                    >
                        {{ t(sideLink.text) }}
                    </RouterLink>
                </div>
            </div>
        </div>
    
    </div>
</template>

<style lang="scss" module="styles">
@import './AuthPage.module.scss';
</style>