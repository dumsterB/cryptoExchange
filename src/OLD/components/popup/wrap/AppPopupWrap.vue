<script setup>
import { computed, nextTick, provide, useCssModule, watchEffect, ref } from 'vue';
import AppPopupBox from '../box/AppPopupBox.vue';
import { useBoundingBox } from './hooks/useBoundingBox';
import { usePopupEscClose } from './hooks/useEscClose';
import { useScrollLock } from '@/hooks/helpers/useScrollLock';

const styles = useCssModule('styles');

const props = defineProps({
    pane: Boolean,
    visible: Boolean,
    paneActivator: HTMLElement
});

const emit = defineEmits({
    close: null,
    'after-leave': null
});

const {
    top,
    left,
    right,
    bottom,
    isPaneLeft
} = useBoundingBox(props.pane, props.paneActivator);

const wrap = ref(null);
const wrapClasses = computed(() => {
    return [styles.wrap, {
        [styles.pane]: props.pane,
        [styles.dialog]: !props.pane
    }];
});

const boxStyles = computed(() => {
    return {
        top: `${ top.value }px`,
        left: `${ left.value }px`,
        right: `${ right.value }px`,
        bottom: `${ bottom.value }px`
    };
});

const boxClasses = computed(() => {
    return props.pane ?
        [styles.box, {
            [styles.contentLeft]: isPaneLeft.value,
            [styles.contentRight]: !isPaneLeft.value
        }]
        : [ styles.box ];
});

const contentStyles = computed(() => {
    if (!props.pane)
        return null;

    return isPaneLeft.value
        ? { transformOrigin: 'top left' }
        : { transformOrigin: 'top right' };
});

const close = () => {
    emit('close');
};

provide('close', close);

usePopupEscClose(close);

const { disableBodyScroll, enableBodyScroll } = useScrollLock();

watchEffect(() => {
    // TODO: lock scroll for pains too
    if (props.pane)
        return;
    
    if (props.visible) {
        nextTick(() => disableBodyScroll(wrap.value));
    } else {
        if (wrap.value) {
            enableBodyScroll(wrap.value);
        }
    }
});
</script>

<template>
    <div
        ref="wrap"
        :class="wrapClasses"
    >

        <Transition
            appear
            name="overlay-appear"
        >
            <div
                v-if="visible"
                :class="styles.overlay"
                @click="close"
            />
        </Transition>

        <div
            :style="boxStyles"
            :class="boxClasses"
        >
            <AppPopupBox
                :visible="visible"
                :dialog="!pane"
                :styles="contentStyles"
                @after-leave="emit('after-leave')"
            >
                <slot />
            </AppPopupBox>
        </div>

    </div>
</template>

<style lang="scss" module="styles">
@import './AppPopupWrap.scss';
</style>

<style lang="scss">
.overlay-appear-enter {
    &-from {
        opacity: 0;
    }

    &-to {
        opacity: 1;
    }

    &-active {
        transition: opacity 0.2s linear;
    }
}

.overlay-appear-leave {
    &-from {
        opacity: 1;
    }

    &-to {
        opacity: 0;
    }

    &-active {
        transition: opacity 0.2s linear;
    }
}
</style>