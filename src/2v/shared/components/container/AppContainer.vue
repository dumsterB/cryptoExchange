<script>
export default {
    name: 'AppContainer'
};
</script>

<template>
    <div :class="styles.container">
        
        <slot />

    </div>
</template>

<style lang="scss" module="styles">
@import './AppContainer.module.scss';
</style>