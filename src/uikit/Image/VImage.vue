<script setup>
import { createImageSrc } from '../image/utils';

// TODO: remove srcset
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