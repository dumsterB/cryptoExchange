import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useOtp } from '@/hooks/useOtp';
import { useSteps } from '../../hooks/useSteps';
import { registerFlowSteps } from '@/config/constants/auth';
import { sendEmailOtp, submitEmailOtp, sendPhoneOtp, submitPhoneOtp } from '@/states/user/fetch/register';

export function useOtpConfirmations(toNextStep) {
    const emailOtp = useOtp({
        sendFetch: sendEmailOtp,
        submitFetch: submitEmailOtp,
        handleSuccessSubmit: toNextStep
    });
    
    const phoneOtp = useOtp({
        sendFetch: sendPhoneOtp,
        submitFetch: submitPhoneOtp,
        handleSuccessSubmit: toNextStep
    });

    return {
        emailOtp,
        phoneOtp
    };
}

export function useFlowSteps() {
    const { t } = useI18n();
    
    const {
        steps,
        currentStep,
        currentStepMetadata,
        allStepsCompleted,
        toNextStep,
        completeAllSteps
    } = useSteps(registerFlowSteps(t));

    // steps navigation
    const stepsNav = computed(() => {
        const active = currentStep.value;

        return [
            {
                title: t('emailConfirmation'),
                active: steps.emailConfirm.key === active,
                completed: steps.emailConfirmSuccess.key <= active
            },
            {
                title: t('phoneConfirmation'),
                active: steps.phoneConfirm.key === active,
                completed: steps.phoneConfirmSuccess.key <= active
            },
            {
                title: t('personInfo'),
                active: steps.personalInfo.key === active,
                completed: false // because after this step will be a success screen. Its the last step.
            }
        ];
    });

    return {
        steps,
        stepsNav,
        allStepsCompleted,
        currentStep,
        currentStepMetadata,
        toNextStep,
        completeAllSteps
    };
}