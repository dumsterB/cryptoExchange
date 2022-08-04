<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    }
});

const icons = import.meta.globEager('../../app/assets/icons/*.svg');

const svg = ref();

watchEffect(() => {
    svg.value = icons[`../../app/assets/icons/${ props.name }.svg`];
});
</script>

<template>
    <component :is="svg" />
</template>