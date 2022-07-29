<script setup>
import { computed, onBeforeMount, onErrorCaptured, useCssModule } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { LAYOUTS } from './layouts';
import ToastsContainer from './components/notification/toast/container/ToastsContainer.vue';

const route = useRoute();
const layout = computed(() => {
    return LAYOUTS[route.meta.layout];
});

const vars = useCssModule('vars');

onBeforeMount(() => {
    document.body.classList.add(vars.colors, vars.decorations);
});

// TODO:
// onErrorCaptured(() => {
//     console.log('error');
// });
</script>

<template>
    <component :is="layout">

        <RouterView />

        <ToastsContainer />

    </component>
</template>

<style lang="scss" module="vars">
@import '@/assets/scss/vars/light-theme.module.scss';
@import '@/assets/scss/vars/decoration.module.scss';
</style>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>
