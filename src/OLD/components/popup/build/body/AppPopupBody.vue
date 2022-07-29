<script>
export default {
    name: 'AppPopupBody'
};
</script>

<template>
    <div :class="styles.body">

        <slot />

    </div>
</template>

<style lang="scss" module="styles">
@import './AppPopupBody.module.scss';
</style>