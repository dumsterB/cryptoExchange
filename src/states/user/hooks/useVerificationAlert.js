import { computed } from 'vue';
import { useUserStore } from '../store';

export function useVerificationAlert() {
    const userStore = useUserStore();
    
    const text = computed(() => {
        switch (userStore.user) {
        case 'init':
            return 'verificationStatusInit';

        case 'pending':
            return 'verificationStatusPending';

        case 'onHold':
            return 'verificationStatusPending';
        
        default:
            return 'verificationStatusDefault';
        }
    });

    const isVisible = computed(
        () => userStore.user.verification.status !== 'completed'
    );

    return {
        text,
        isVisible
    };
}