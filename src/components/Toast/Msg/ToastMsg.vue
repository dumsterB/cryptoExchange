<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { VIcon } from '@/uikit';

const props = defineProps({
    view: {
        type: String,
        default: 'default',
        validator(view) {
            return ['info', 'danger', 'success', 'warning'].includes(view);
        }
    },
    ttl: {
        type: Number,
        required: true
    }
});

const emit = defineEmits({
    remove: null
});

const icon = computed(() => {
    switch (props.view) {

    case 'default':
        return null;
        
    case 'danger':
        return 'circle-close';
    
    default:
        return null;
    }
});

const timer = ref();

const handleRemove = () => {
    emit('remove');
};

const handleMouseEnter = () => {
    clearTimeout(timer.value);
};

const handleMouseLeave = () => {
    if (timer.value) {
        clearTimeout(timer.value);
    }

    timer.value = setTimeout(() => {
        handleRemove();
    }, props.ttl);
};

onMounted(() => {
    if (timer.value) {
        clearTimeout(timer.value);
    }

    timer.value = window.setTimeout(() => {
        handleRemove();
    }, props.ttl);
});

onUnmounted(() => {
    if (timer.value) {
        clearTimeout(timer.value);
    }
});
</script>

<template>
    <Transition
        name="toast-appear"
        appear
    >
        <div
            :class="[styles.toast, styles[view]]"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
        >
            <div
                v-if="icon"
                :class="styles.icon"
            >
                <VIcon :name="icon" />
            </div>

            <div :class="styles.text">
                <slot />
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" module="styles">
@import './ToastMsg.module.scss';
</style>

<style lang="scss">
.toast-appear-enter {
    &-from {
        opacity: 0;
        transform: translate(-50%, -25px);
    }

    &-to {
        opacity: 1;
        transform: translate(-50%, 0);
    }

    &-active {
        transition: transform 0.15s ease-in-out, opacity 0.1s linear;
    }
}
</style>