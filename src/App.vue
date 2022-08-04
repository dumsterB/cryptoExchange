<script setup>
import { computed, onBeforeMount, useCssModule } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { layouts } from '@/components/Layouts';
import { ToastsContainer } from '@/components/Toast';

const route = useRoute();
const layout = computed(() => {
    return layouts[route.meta.layout];
});

const vars = useCssModule('vars');

onBeforeMount(
    () => document.body.classList.add(vars.colors, vars.decorations)
);
</script>

<template>
    <component :is="layout">

        <RouterView />
        <ToastsContainer />

    </component>
</template>

<style lang="scss" module="vars">
@import '@/app/assets/scss/vars/light-theme.module.scss';
@import '@/app/assets/scss/vars/decoration.module.scss';
</style>

<style lang="scss">
@import '@/app/assets/scss/app.scss';
</style>
