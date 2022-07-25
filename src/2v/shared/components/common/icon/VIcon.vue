<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    }
});

const icons = import.meta.globEager('../../../assets/icons/*.svg');

const svg = ref();

watchEffect(() => {
    svg.value = icons[`../../../assets/icons/${ props.name }.svg`];
});
</script>

<template>
    <component :is="svg" />
</template>