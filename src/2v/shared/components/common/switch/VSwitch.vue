<script setup>
import { computed } from 'vue'

const props = defineProps({
    checked: Boolean
});

const emit = defineEmits({
    'update:checked': value => [true, false].includes(value)
});

const classes = computed(() => {
    return ['VSwitch', {
        'VSwitch_checked': props.checked
    }];
});

const onChange = () => {
    emit('update:checked', !props.checked);
};
</script>

<template>
    <div :class="classes">

        <div class="VSwitch-Track" />

        <div class="VSwitch-Handle" />

        <input
            type="checkbox"
            role="switch"
            class="VSwitch-Native"
            :checked="checked"
            :aria-checked="checked.toString()"
            @change="onChange"
        />

    </div>
</template>

<style lang="scss">
@import './VSwitch.scss';
</style>