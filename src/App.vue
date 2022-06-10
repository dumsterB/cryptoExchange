<script setup>
import { defineAsyncComponent, onBeforeMount, useCssModule } from 'vue'
import { RouterView } from 'vue-router'

const vars = useCssModule('vars');

const layout = defineAsyncComponent(() => import('./layouts/DefaultLayout.vue'));

onBeforeMount(() => {
    document.body.classList.add(vars.colors, vars.decorations);
});
</script>

<template>
    <component :is="layout">

        <RouterView />
        
    </component>
</template>

<style lang="scss" module="vars">
@import '@/assets/scss/vars/light-theme.module.scss';
@import '@/assets/scss/vars/decoration.module.scss';
</style>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>