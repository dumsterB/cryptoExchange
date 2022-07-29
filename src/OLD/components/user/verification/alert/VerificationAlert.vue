<script setup>
import VButton from '@/2v/shared/components/common/button/VButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div :class="styles.alert">
        <div :class="styles.text">
            {{ t('verificationAlert') }}
        </div>

        <div :class="[styles.text, styles.textMobile]">
            {{ t('verificationAlertShort') }}
        </div>

        <VButton
            to="/kyc"
            size="xs"
            view="filled"
            :class="styles.button"
        >
            {{ t('button.confirm') }}
        </VButton>
    </div>
</template>

<style
    lang="scss"
    module="styles"
>
@import './VerificationAlert.module.scss';
</style>
