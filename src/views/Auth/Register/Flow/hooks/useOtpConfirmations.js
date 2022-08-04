import { useOtp } from '@/hooks/useOtp';
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