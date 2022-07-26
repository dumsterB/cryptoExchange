<script setup>
defineProps({
    image: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div
        :class="styles.icon"
        :style="{ backgroundImage: `url(${ image })`}"
    />
</template>

<style lang="scss" module="styles">
@import './CurrencyIcon.module.scss';
</style>