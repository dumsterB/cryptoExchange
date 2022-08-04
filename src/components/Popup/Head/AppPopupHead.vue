<script>
export default {
    name: 'AppPopupHead'
};
</script>

<script setup>
import { inject } from 'vue';
import AppPopupClose from '../close/AppPopupClose';

const close = inject('close');
</script>

<template>
    <div :class="styles.head">

        <div :class="styles.title">
            <slot />
        </div>

        <AppPopupClose @click="close" />

    </div>
</template>

<style lang="scss" module="styles">
@import './AppPopupHead.module.scss';
</style>