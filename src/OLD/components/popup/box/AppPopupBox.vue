<script setup>
import { computed, toRef, useCssModule } from 'vue';

const styles = useCssModule('styles');

const props = defineProps({
    visible: Boolean,
    dialog: Boolean,
    styles: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits({
    'after-leave': null
});

const contentClasses = computed(() => {
    return [styles.content, {
        [styles.dialog]: props.dialog,
        [styles.pane]: !props.dialog
    }];
});

const boxStyles = toRef(props, 'styles');
</script>

<template>
    <div :class="contentClasses">
        <Transition
            appear
            :enter-from-class="styles.popupAppearEnterFrom"
            :enter-active-class="styles.popupAppearEnterActive"
            :enter-to-class="styles.popupAppearEnterTo"
            :leave-from-class="styles.popupAppearLeaveFrom"
            :leave-active-class="styles.popupAppearLeaveActive"
            :leave-to-class="styles.popupAppearLeaveTo"
            @after-leave="emit('after-leave')"
        >
            <div
                v-if="visible"
                :class="styles.box"
                :style="boxStyles"
            >
                <slot />
            </div>
        </Transition>
    </div>
</template>

<style lang="scss" module="styles">
@import './AppPopupBox.module.scss';
</style>