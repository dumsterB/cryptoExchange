import { computed, onUnmounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Control userflow steps
// return steps, currentStep & method for him control
export function useSteps(steps) {
    const route = useRoute();
    const router = useRouter();

    const firstStepKey = Object.values(steps)[0]?.key;

    const currentStep = ref(
        parseInt(route.query.step) || firstStepKey
    );
    const currentStepMetadata = computed(() => Object.values(steps).find(
        ({ key }) => key === currentStep.value
    ));

    // watch for currentStep change
    watchEffect(() => {
        if (currentStep.value > firstStepKey) {
            const query = { step: currentStep.value };

            router.push({ query });
        }
    });

    const allStepsCompleted = ref(false);
  
    const toNextStep = () => currentStep.value++;
    const completeAllSteps = () => allStepsCompleted.value = true;

    onUnmounted(() => {
        router.replace({ query: {} });
    });

    return {
        currentStep,
        currentStepMetadata,
        allStepsCompleted,
        toNextStep,
        completeAllSteps
    };
}