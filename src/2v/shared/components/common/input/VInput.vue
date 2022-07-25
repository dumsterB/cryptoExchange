<script setup>
import { computed, ref } from 'vue';
import { useInputMask } from '@/hooks/helpers/useInputMask';

const props = defineProps({
    view: {
        type: String,
        default: 'default',
        validator(view) {
            return ['default', 'surface'].includes(view);
        }
    },
    type: {
        type: String,
        default: 'text',
        validator(type) {
            return ['text', 'tel', 'email', 'number', 'password'].includes(type);
        }
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    name: {
        type: [String, null],
        default: null
    },
    label: {
        type: [String, null],
        default: null
    },
    placeholder: {
        type: [String, null],
        default: null
    },
    tabindex: {
        type: [String, null],
        default: null
    },
    maxlength: {
        type: [String, null],
        default: null
    },
    // Inputmask object
    // https://github.com/RobinHerbots/Inputmask
    mask: {
        type: [Object, null],
        default: null
    },
    error: {
        type: [String, Boolean],
        default: false
    },
    disabled: Boolean
});

const emit = defineEmits({
    'focus': null,
    'blur': null,
    'change': null,
    'keydown-enter': null,
    'update:modelValue': str => typeof str === 'string' || typeof str === 'number'
});

const input = ref(null);
const isFocused = ref(false);

const inputClasses = computed(() => {
    const { view, label, modelValue, disabled, error } = props;

    return ['VInput', `VInput_${ view }`, {
        'VInput_label': label,
        'VInput_active': !!modelValue,
        'VInput_focused': isFocused.value,
        'VInput_disabled': disabled,
        'VInput_danger': error
    }];
});

const errorMsg = computed(() => {
    const { error } = props;

    return typeof error === 'string'
        ? error
        : null;
});

const onFocus = e => {
    isFocused.value = true;

    emit('focus', e);
};
const onBlur = e => {
    isFocused.value = false;

    emit('blur', e);
};

const onEnter = e => emit('keydown-enter', e);
const onChange = e => emit('change', e);
const onInput = e => emit('update:modelValue', e.target.value);

if (props.mask) {
    useInputMask(input, props.mask);
}

defineExpose({ input });
</script>

<template>
    <div :class="inputClasses">

        <div class="VInput-Inner">
            <slot name="addon-left" />

            <div class="VInput-Area">
                <input
                    ref="input"
                    :name="name"
                    :type="type"
                    :value="modelValue"
                    :placeholder="placeholder"
                    :maxlength="maxlength"
                    :tabindex="tabindex"
                    class="VInput-Native"
                    @focus="onFocus"
                    @blur="onBlur"
                    @input="onInput"
                    @change="onChange"
                    @keydown.enter="onEnter"
                >

                <div
                    v-if="label"
                    class="VInput-Label"
                >
                    {{ label }}
                </div>
            </div>

            <slot name="addon-right" />
        </div>

        <div
            v-if="errorMsg"
            class="VInput-Error"
        >
            {{ errorMsg }}
        </div>

    </div>
</template>

<style lang="scss">
@import './VInput.scss';
</style>