import { computed, onUnmounted, ref, watchEffect } from 'vue';
import { steps as getSteps } from '../config/steps';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

export function useSteps() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();

    const steps = getSteps(t); // get from config
    const allStepsCompleted = ref(false);

    const currentStep = ref(
        parseInt(route.query.step) || steps.emailConfirm.key
    );
    const currentStepMetadata = computed(
        () => Object.values(steps).find(
            ({ key }) => key === currentStep.value
        )
    );

    // watch for currentStep change
    watchEffect(() => {
        if (currentStep.value > steps.emailConfirm.key) {
            const query = { step: currentStep.value };

            router.push({ query });
        }
    });

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

    // methods
    const toNextStep = () => currentStep.value++;
    const completeAllSteps = () => allStepsCompleted.value = true;

    // clear query on unmounted
    onUnmounted(() => router.replace({ query: {} }));

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