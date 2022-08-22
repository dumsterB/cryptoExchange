import { useI18n } from 'vue-i18n';
import { useSteps } from '../../hooks/useSteps';
import { resetPasswordSteps } from '@/config/constants/auth';

// return screens and current step (screen) in flow
export function useResetPasswordSteps() {
    const { t } = useI18n();
    const steps = resetPasswordSteps(t);

    const {
        currentStep,
        currentStepMetadata,
        allStepsCompleted,
        toNextStep,
        completeAllSteps
    } = useSteps(resetPasswordSteps(t));

    return {
        steps,
        currentStep,
        currentStepMetadata,
        allStepsCompleted,
        toNextStep,
        completeAllSteps
    };
}
