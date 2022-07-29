<script setup>
import ToastNotification from '../notification/ToastNotification.vue';
import { useState } from '@/hooks/toast/useState';
import { useToast } from '@/hooks/toast/useToast';
import { computed, watchEffect } from 'vue';

const toast = useToast();
const { toasts } = useState();

const hasToasts = computed(() => {
    return toasts.size;
});

const allToasts = computed(() => {
    return hasToasts.value
        ? toasts.entries()
        : [];
});

watchEffect(() => {
    const max = import.meta.env.VITE_TOASTS_MAX_COUNT;

    if (toasts.size > max) {
        toasts.forEach(
            (_, key) => toasts.size > max && toasts.has(key) && toast.close(key)
        );
    }
});
</script>

<template>
    <Teleport to="#toasts">
        <div
            v-if="hasToasts"
            :class="styles.wrap"
        >

            <ToastNotification
                v-for="([ id, { view, text }]) in allToasts"
                :id="id"
                :key="id"
                :view="view"
                @close="toast.close(id)"
            >
                {{ text }}
            </ToastNotification>

        </div>
    </Teleport>
</template>

<style lang="scss" module="styles">
@import './ToastsContainer.module.scss';
</style>