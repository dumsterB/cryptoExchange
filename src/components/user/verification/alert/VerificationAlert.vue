<script setup>
import VButton from '@/components/common/button/VButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// TODO: verification
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
            size="small"
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
