<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    }
});

const icons = import.meta.globEager('../../../../app/icons/*.svg');

const svg = ref();

watchEffect(() => {
    svg.value = icons[`../../../../app/icons/${ props.name }.svg`];
});
</script>

<template>
    <component :is="svg" />
</template>