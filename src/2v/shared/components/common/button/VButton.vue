<script setup>
import { computed, useSlots } from 'vue'
import { useRouter } from 'vue-router'
import VSpin from '@/components/common/spin/VSpin.vue'

const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    size: {
        type: String,
        default: 'm',
        validator(size) {
            return ['xs', 's', 'm'].includes(size);
        }
    },
    view: {
        type: String,
        default: 'action',
        validator(view) {
            return ['action', 'filled'].includes(view);
        }
    },
    to: {
        type: [String, Object],
        default: ''
    },
    href: {
        type: String,
        default: ''
    },
    rel: {
        type: [String, null],
        default: null
    },
    blank: Boolean,
    block: Boolean,
    loading: Boolean,
    disabled: Boolean
});

const emit = defineEmits({
    click: null
});

const router = useRouter();
const slots = useSlots();

const tag = computed(() => {
    const { href } = props;

    return href ? 'a' : 'button';
});

const classes = computed(() => {
    const { size, view, block, loading, disabled } = props;

    return ['VButton', `VButton_${ size }`, `VButton_${ view }`, {
        'VButton_max-width': block,
        'VButton_loading': loading && !disabled,
        'VButton_disabled': disabled
    }];
});

const buttonProps = computed(() => {
    const { href, rel, blank, type } = props;

    return href
        ? {
            href,
            rel,
            target: blank ? '_blank' : null
        }
        : { type };
});

const onClick = event => {
    const { disabled, loading, to } = props;

    if (disabled || loading)
        return;
    
    if (to)
        return router.push(to);

    emit('click', event);
}
</script>

<template>
    <component
        :is="tag"
        :class="classes"
        v-bind="buttonProps"
        @click="onClick"
    >

        <VSpin
            v-if="loading"
            class="VButton-Spin"
        />

        <span
            v-if="slots.icon"
            class="VButton-Icon"
        >
            <slot name="icon" />
        </span>

        <span class="VButton-Text">
            <slot />
        </span>


    </component>
</template>

<style lang="scss">
@import './VButton.scss';
</style>