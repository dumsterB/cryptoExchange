<script setup>
import { onErrorCaptured, ref } from 'vue';
import VButton from '@/2v/shared/components/common/button/VButton.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const error = ref(null);

onErrorCaptured(err => {
    error.value = err;

    console.error(err);
    
    return false;
});

const reloadPage = () => window.location.reload();
</script>

<template>
    <div
        v-if="error"
        :class="styles.container"
    >
        <div :class="styles.title">
            {{ t('errors.somethingFailed') }}
        </div>

        <div :class="styles.description">
            {{ t('somethingFailedInstruction') }}
        </div>

        <VButton
            size="s"
            @click="reloadPage"
        >
            {{ t('button.reload') }}
        </VButton>
    </div>
    <slot v-else />
</template>

<style lang="scss" module="styles">
@import './ErrorBoundary.module.scss';
</style>