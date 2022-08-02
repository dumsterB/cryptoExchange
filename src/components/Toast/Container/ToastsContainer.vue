<script setup>
import { watchEffect } from 'vue';
import ToastMsg from '../Msg/ToastMsg.vue';
import { useToast, useToasts } from '../hooks';

const toast = useToast();
const { toasts } = useToasts();

watchEffect(() => {
    if (toasts.value.length > 1) {
        toasts.value.forEach(({ id }) => toasts.value.length > 1 && toast.remove(id));
    }
});
</script>

<template>
    <Teleport to="#toasts">

        <ToastMsg
            v-for="({ id, view, text }) in toasts"
            :key="id"
            :view="view"
            :ttl="3600"
            @remove="toast.remove(id)"
        >
            {{ text }}
        </ToastMsg>

    </Teleport>
</template>