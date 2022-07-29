<script>
export default {
    name: 'AppPopup'
};
</script>

<script setup>
import { toRef, ref, watchEffect, computed } from 'vue';
import AppPopupWrap from './wrap/AppPopupWrap.vue';
import { DIALOG_VIEW, PANE_VIEW } from './types';

// TODO:
// рефакторинг

const props = defineProps({
    view: {
        type: String,
        default: DIALOG_VIEW,
        validator(type) {
            return [DIALOG_VIEW, PANE_VIEW].includes(type);
        }
    },
    modelValue: Boolean,
    paneActivator: HTMLElement 
});

const emit = defineEmits({
    'update:modelValue': null
});

const isPane = computed(() => {
    return props.view === PANE_VIEW;
});

const isOpen = ref(false);
const isVisible = toRef(props, 'modelValue');

const onClose = () => {
    emit('update:modelValue', false);
};

const onAfterLeave = () => {
    isOpen.value = false;
};

watchEffect(() => {
    if (isVisible.value) {
        isOpen.value = true;
    }
});
</script>

<template>
    <Teleport to="#popups">
        <AppPopupWrap
            v-if="isOpen"
            :visible="isVisible"
            :pane="isPane"
            :pane-activator="paneActivator"
            @close="onClose"
            @after-leave="onAfterLeave"
        >
        
            <slot :close="onClose" />

        </AppPopupWrap>
    </Teleport>
</template>