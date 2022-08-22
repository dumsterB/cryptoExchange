<script setup>
import { computed } from 'vue';
import { VButton, VIcon, VCodeField } from '@/uikit';
import { AppPopup } from '@/components/Popup';
import { useI18n } from 'vue-i18n';
import { usePopup } from '@/hooks/usePopup';

const props = defineProps({
    // confirm available in (seconds prop)
    availableIn: {
        type: Number,
        required: true
    },
    error: Boolean,
    loading: Boolean,
    sendingAvailable: Boolean
});

const emit = defineEmits({
    'send': null,
    'submit': null
});

const { t } = useI18n();
const {
    isInstructionOpen,
    openInstruction,
    closeInstruction
} = usePopup('Instruction');

const isButtonDisabled = computed(
    () => !props.sendingAvailable
);

const buttonText = computed(
    () => props.sendingAvailable
        ? t('sendOtp')
        : t('sendAvailableOn', { count: props.availableIn })
);

const handleCodeSend = () => props.sendingAvailable && emit('send');
const handleCodeSubmit = (code) => emit('submit', code);
</script>

<template>
    <div :class="styles.wrap">
        <div :class="styles.field">
            <VCodeField
                :error="error"
                @on-complete="handleCodeSubmit"
            />

            <div
                v-if="error"
                :class="styles.error"
            >
                {{ t('errors.invalidOtpCode') }}
            </div>
        </div>

        <VButton
            size="s"
            block
            :loading="loading"
            :disabled="isButtonDisabled"
            @click="handleCodeSend"
        >
            {{ buttonText }}
        </VButton>

        <div
            :class="styles.instruction"
            @click="openInstruction"
        >
            {{ t('haveYouGotOtp') }}
        </div>

        <AppPopup v-model="isInstructionOpen">
            <div :class="styles.popup">
                <div :class="styles.popupHead">
                    <div :class="styles.popupIcon">
                        <VIcon name="delete-email" />
                    </div>

                    <div :class="styles.popupTitle">
                        {{ t('haveYouGotOtp') }}
                    </div>
                </div>

                <div :class="styles.popupBody">
                    <slot name="instruction" />
                </div>

                <div :class="styles.popupFooter">
                    <VButton
                        size="s"
                        :class="styles.popupButton"
                        @click="closeInstruction"
                    >
                        {{ t('button.ok') }}
                    </VButton>
                </div>
            </div>
        </AppPopup>
    </div>
</template>

<style lang="scss" module="styles">
@import './OtpForm.module.scss';
</style>