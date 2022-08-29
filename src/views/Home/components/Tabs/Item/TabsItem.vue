<script setup>
import { inject, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const isActive = ref(false);

const activeTab = inject('activeTab');
const registerTab = inject('registerTab');
const unregisterTab = inject('unregisterTab');

watch(activeTab, active => {
    isActive.value = active === props.type;
});

onMounted(() => {
    const { type, title } = props;

    registerTab({
        type,
        title
    });
});

onUnmounted(() => {
    const { type } = props;

    unregisterTab({ type });
});
</script>

<template>
    <div
        v-if="isActive"
        :class="styles.tab"
    >

        <slot />

    </div>
</template>

<style lang="scss" module="styles">
@import './TabsItem.module.scss';
</style>