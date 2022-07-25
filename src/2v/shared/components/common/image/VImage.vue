<script setup>
import { createImageSrc } from '@/utils/image';

defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: ''
    }
});
</script>

<template>
    <img
        :srcset="createImageSrc(src)"
        :alt="alt"
    />
</template>