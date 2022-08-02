<script setup>
import { computed, ref, useAttrs } from 'vue';
import VIcon from '../icon/VIcon.vue';
import VInput from '../Input/VInput.vue';

const attrs = useAttrs();
const isPasswordVisible = ref(false);

const type = computed(() => isPasswordVisible.value
    ? 'text'
    : 'password');

const icon = computed(() => isPasswordVisible.value
    ? 'eye-slash-fill'
    : 'eye-fill');

const togglePasswordVisibility = () => isPasswordVisible.value = !isPasswordVisible.value;
</script>

<template>
    <VInput
        :type="type"
        v-bind="attrs"
    >
        <template #addon-right>
            <button
                :class="styles.button"
                @click="togglePasswordVisibility"
            >
                <Transition
                    mode="out-in"
                    name="input-button"
                >
                    <span
                        :key="icon"
                        :class="styles.icon"
                    >
                        <VIcon :name="icon" />
                    </span>
                </Transition>
            </button>
        </template>
    </VInput>
</template>

<style lang="scss" module="styles">
@import './VPasswordInput.module.scss';
</style>

<style lang="scss">
.input-button-enter {
    &-from {
        transform: scale(0);
    }

    &-to {
        transform: scale(1);
    }

    &-active {
        transition: transform 0.1s ease-in-out;
    }
}
</style>