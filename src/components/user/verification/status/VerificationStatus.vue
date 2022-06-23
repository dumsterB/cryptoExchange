<script setup>
import { computed, useCssModule } from 'vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n';

const styles = useCssModule('styles');
const { t } = useI18n();
const userStore = useUserStore();

const verificationClasses = computed(() => {
    return [styles.verification, {
        [styles.green]: userStore.isVerified,
        [styles.orange]: !userStore.isVerified
    }]
});

const verificationText = computed(() => {
    return userStore.isVerified
        ? t('verified')
        : t('notVerified');
});
</script>

<template>
    <div :class="verificationClasses">
        {{ verificationText }}
    </div>
</template>

<style lang="scss" module="styles">
@import './VerificationStatus.module.scss';
</style>