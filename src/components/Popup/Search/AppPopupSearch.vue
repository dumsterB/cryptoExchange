<script>
export default {
    name: 'AppPopupSearch'
};
</script>

<script setup>
import { computed } from 'vue';
import { VIcon, VInput } from '@/uikit';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    }
});

const emit = defineEmits({
    'update:modelValue': null
});

const inputValue = computed({
    set(val) {
        emit('update:modelValue', val);
    },
    get() {
        return props.modelValue;
    }
});
</script>

<template>
    <div :class="styles.search">

        <VInput
            v-model="inputValue"
            view="surface"
            :placeholder="placeholder"
            maxlength="64"
            :class="styles.input"
        >
            <template #addon-left>
                <div :class="styles.icon">
                    <VIcon name="search" />
                </div>
            </template>
        </VInput>
        
    </div>
</template>

<style lang="scss" module="styles">
@import './AppPopupSearch.module.scss';
</style>