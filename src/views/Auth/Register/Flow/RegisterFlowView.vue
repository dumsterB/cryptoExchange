<script setup>
import { computed, ref } from 'vue';
import { VButton } from '@/uikit';
import OtpForm from '../../components/OtpSuccess/OtpForm';
import OtpSuccess from '../../components/OtpSuccess/OtpSuccess';
import FlowStep from './components/Step/FlowStep';
import PersonForm from './components/Person/PersonForm.vue';
import SuccessResult from './components/Success/SuccessResult';
import { useI18n } from 'vue-i18n';
import { useFlowSteps, useOtpConfirmations } from './hooks';

const { t } = useI18n();
const {
    steps,
    stepsNav,
    allStepsCompleted,
    currentStep,
    currentStepMetadata,
    toNextStep,
    completeAllSteps
} = useFlowSteps();

const { emailOtp, phoneOtp } = useOtpConfirmations(toNextStep);

const blocksVisibility = computed(() => {
    const step = currentStep.value;

    return {
        emailOtp: step === steps.emailConfirm.key,
        phoneOtp: step === steps.phoneConfirm.key,
        otpSuccess: [steps.emailConfirmSuccess.key, steps.phoneConfirmSuccess.key].includes(currentStep.value),
        personalInfo: step === steps.personalInfo.key,
    };
});

const footerVisibility = computed(
    () => currentStep.value === steps.personalInfo.key
);

const personForm = ref(null);
const personFormLoading = ref(false);

const savePersonInfo = () => personForm.value.save();
</script>

<template>
    <div
        v-if="!allStepsCompleted"
        :class="styles.wrap"
    >
        <div :class="styles.head">
            <FlowStep
                v-for="({ title, active, completed }) in stepsNav"
                :key="title"
                :active="active"
                :completed="completed"
            >
                {{ title }}
            </FlowStep>
        </div>

        <div :class="styles.body">
            <OtpSuccess
                v-if="blocksVisibility.otpSuccess"
                :t="t"
                @skip="toNextStep"
            >
                <template #title>
                    {{ currentStepMetadata.title }}
                </template>

                <template #description>
                    {{ currentStepMetadata.description }}
                </template>
            </OtpSuccess>

            <div
                v-else
                :class="styles.form"
            >
                <div :class="styles.formHead">
                    <div :class="styles.formTitle">
                        {{ currentStepMetadata.title }}
                    </div>

                    <div
                        v-if="currentStepMetadata.description"
                        :class="styles.formDescription"
                    >
                        {{ currentStepMetadata.description }}
                    </div>
                </div>

                <!-- Email otp form -->
                <OtpForm
                    v-if="blocksVisibility.emailOtp"
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

                <!-- Phone otp form -->
                <OtpForm
                    v-else-if="blocksVisibility.phoneOtp"
                    :available-in="phoneOtp.timer.value"
                    :error="phoneOtp.state.error"
                    :loading="phoneOtp.state.loading"
                    :sending-available="phoneOtp.state.sendingAvailable"
                    @send="phoneOtp.send"
                    @submit="phoneOtp.submit"
                >
                    <template #instruction>
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <p v-html="t('phoneConfirmationInstruction')" />
                    </template>
                </OtpForm>

                <PersonForm
                    v-else-if="blocksVisibility.personalInfo"
                    ref="personForm"
                    v-model:loading="personFormLoading"
                    @completed="completeAllSteps"
                />
            </div>
        </div>

        <div
            v-if="footerVisibility"
            :class="styles.footer"
        >
            <VButton
                size="m"
                block
                :class="styles.button"
                :loading="personFormLoading"
                @click="savePersonInfo"
            >
                {{ t('button.continue') }}
            </VButton>
        </div>
    </div>

    <SuccessResult
        v-else
        :t="t"
    />
</template>

<style lang="scss" module="styles">
@import './RegisterFlowView.module.scss';
</style>