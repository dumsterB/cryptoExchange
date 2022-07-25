<script setup>
import { computed, toRef, ref, useSlots } from 'vue';
import VIcon from '../icon/VIcon.vue';

const props = defineProps({
    view: {
        type: String,
        default: 'action',
        validator(view) {
            return ['action'].includes(view);
        }
    },
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits({
    'update:modelValue': val => typeof val === 'boolean' 
})

const slots = useSlots();
const input = ref(null);
const checked = toRef(props, 'modelValue');

const classes = computed(() => {
    return ['VCheckbox', `VCheckbox_${ props.view }`, {
        'VCheckbox_checked': checked.value
    }];
})

const onChange = event => {
    emit('update:modelValue', event.target.checked);
}

const onClickLabel = () => {
    input.value.click();
}
</script>

<template>
    <div :class="classes">

        <div class="VCheckbox-Box">
            <input
                ref="input"
                type="checkbox"
                class="VCheckbox-Native"
                :checked="checked"
                :aria-checked="checked.toString()"
                @change="onChange"
            >

            <div class="VCheckbox-Tick">
                <VIcon name="check" />
            </div>
        </div>

        <label
            v-if="slots.default?.()"
            class="VCheckbox-Label"
            @click="onClickLabel"
        >
            <slot />
        </label>

    </div>
</template>

<style lang="scss">
@import './VCheckbox.scss';
</style>