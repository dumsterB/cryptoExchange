<script setup>
defineProps({
    active: Boolean 
});

const emit = defineEmits({
    click: null
});
</script>

<template>
    <button
        type="button"
        :class="[
            styles.button,
            {
                [styles.active]: active
            }
        ]"
        @click="emit('click')"
    >
        
        <slot />

    </button>
</template>

<style lang="scss" module="styles">
@import './IconButton.module.scss';
</style>