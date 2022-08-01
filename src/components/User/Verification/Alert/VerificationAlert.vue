<script setup>
import { VButton } from '@/uikit';
import { useI18n } from 'vue-i18n';
import { useVerificationAlert } from '@/states/user/hooks/useVerificationAlert';

const { t } = useI18n();
const { text, isVisible } = useVerificationAlert();
</script>

<template>
    <div
        v-if="isVisible"
        :class="styles.alert"
    >
        <div :class="styles.text">
            {{ t(text) }}
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
