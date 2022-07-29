<script setup>
defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: ''
    },
    // s - 18px
    // m - 24px
    // l - 44px
    size: {
        type: String,
        default: 'l',
        validator(size) {
            return ['s', 'm', 'l'].includes(size);
        }
    }
});
</script>

<template>
    <div :class="[styles.icon, styles[size]]">

        <img
            :src="src"
            :alt="alt"
        />
        
    </div>
</template>

<style lang="scss" module="styles">
@import './AssetIcon.module.scss';
</style>