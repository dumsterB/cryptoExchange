<script setup>
import VButton from '@/components/common/button/VButton.vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits({
    skip: null
});

const { t } = useI18n();
</script>

<template>
    <div :class="styles.content">

        <Transition
            appear
            :enter-from-class="transition.iconAppearEnterFrom"
            :enter-to-class="transition.iconAppearEnterTo"
            :enter-active-class="transition.iconAppearEnterActive"
        >
            <div :class="styles.icon">
                <slot name="icon" />
            </div>
        </Transition>

        <div :class="styles.title">
            <slot name="title" />
        </div>

        <div :class="styles.description">
            <slot name="description" />
        </div>

        <VButton
            size="s"
            @click="emit('skip')"
        >
            {{ t('button.next') }}
        </VButton>

    </div>
</template>

<style lang="scss" module="styles">
@import './OtpSuccess.module.scss';
</style>

<style lang="scss" module="transition">
.icon-appear-enter {
    &-from {
        opacity: 0;
        transform: scale(0.5);
    }

    &-to {
        opacity: 1;
        transform: scale(1);
    }

    &-active {
        transition: transform 0.25s, opacity 0.15s;
    }
}
</style>