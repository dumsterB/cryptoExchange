<script setup>
import { computed } from 'vue';
import { VButton, VIcon, VInput, VPasswordInput } from '@/uikit';
import OtpForm from '../components/OtpForm/OtpForm.vue';
import SuccessResult from './components/Success/SuccessResult';
import { useI18n } from 'vue-i18n';
import { useOtpForm } from './hooks/useOtpForm';
import { useEmailForm } from './hooks/useEmailForm';
import { usePasswordForm } from './hooks/usePasswordForm';
import { useResetPasswordSteps } from './hooks/useResetPasswordSteps';

const { t } = useI18n();

const {
    steps,
    currentStep,
    currentStepMetadata,
    allStepsCompleted,
    toNextStep,
    completeAllSteps
} = useResetPasswordSteps();

const blocksVisibility = computed(() => {
    const step = currentStep.value;
    
    return {
        emailForm: steps.emailEnter.key === step,
        otpForm: steps.otpConfirm.key === step,
        passwordForm: steps.newPassword.key === step
    };
});

const emailOtp = useOtpForm(toNextStep);

const {
    email,
    emailError,
    emailListeners,
    isLoading: emailFormLoading,
    submit: submitEmailForm
} = useEmailForm(toNextStep);

const {
    isLoading: isLoadingPasswordForm,
    savePassword,
    password,
    passwordError,
    passwordListeners,
    passwordConfirm,
    passwordConfirmError,
    passwordConfirmListeners
} = usePasswordForm(completeAllSteps);
</script>

<template>
    <SuccessResult
        v-if="allStepsCompleted"
        :t="t"
    />
    <div
        v-else
        :class="styles.container"
    >
        <div :class="styles.form">

            <div :class="styles.head">
                <div :class="styles.icon">
                    <VIcon
                        :key="currentStepMetadata.icon"
                        :name="currentStepMetadata.icon"
                    />
                </div>

                <div :class="styles.title">
                    {{ currentStepMetadata.title }}
                </div>

                <div
                    v-if="currentStepMetadata.description"
                    :class="styles.description"
                >
                    {{ currentStepMetadata.description }}
                </div>
            </div>

            <div
                v-if="blocksVisibility.emailForm"
                :class="styles.body"
            >
                <VInput
                    v-model="email"
                    :label="t('email')"
                    :error="emailError"
                    :class="styles.input"
                    v-on="emailListeners"
                />

                <VButton
                    size="s"
                    block
                    :loading="emailFormLoading"
                    :class="styles.button"
                    @click="submitEmailForm"
                >
                    {{ t('button.next') }}
                </VButton>
            </div>

            <div
                v-if="blocksVisibility.otpForm"
                :class="styles.body"
            >
                <OtpForm
                    :available-in="emailOtp.timer.value"
                    :error="emailOtp.state.error"
                    :loading="emailOtp.state.loading"
                    :sending-available="emailOtp.state.sendingAvailable"
                    @send="emailOtp.send"
                    @submit="emailOtp.submit"
                >
                    <template #instruction>
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <p v-html="t('emailConfirmationInstruction')" />
                    </template>
                </OtpForm>
            </div>

            <div
                v-if="blocksVisibility.passwordForm"
                :class="styles.body"
            >
                <VPasswordInput
                    v-model="password"
                    :label="t('password')"
                    :error="passwordError"
                    :class="styles.input"
                    v-on="passwordListeners"
                />

                <VPasswordInput
                    v-model="passwordConfirm"
                    :label="t('passwordConfirm')"
                    :error="passwordConfirmError"
                    :class="styles.input"
                    v-on="passwordConfirmListeners"
                />

                <VButton
                    size="s"
                    block
                    :class="styles.button"
                    :loading="isLoadingPasswordForm"
                    @click="savePassword"
                >
                    {{ t('button.next') }}
                </VButton>
            </div>

        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './ResetPasswordView.module.scss';
</style>