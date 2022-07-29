<script setup>
import { computed, onMounted } from 'vue';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    view: {
        type: String,
        default: 'default',
        validator(view) {
            return ['default', 'danger'].includes(view);
        }
    },

});

const emit = defineEmits({
    close: null
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

onMounted(() => {
    setTimeout(
        () => emit('close'),
        import.meta.env.VITE_TOAST_LIVE_TIME_MS
    );
});

const close = () => emit('close');
</script>

<template>
    <Transition
        name="toast-appear"
        appear
    >
        <div
            :class="[styles.toast, styles[view]]"
            @click="close"
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
@import './ToastNotification.module.scss';
</style>

<style lang="scss">
.toast-appear-enter {
    &-from {
        opacity: 0;
        transform: translate(0, -25px);
    }

    &-to {
        opacity: 1;
        transform: translate(0, 0);
    }

    &-active {
        transition: transform 0.15s ease-in-out, opacity 0.1s linear;
    }
}
</style>