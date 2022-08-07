import { useOtp } from '@/hooks/useOtp';
import { getWaitListID, setWaitListID } from '@/states/user/services/register';
import { sendEmailOtp, submitEmailOtp, sendPhoneOtp, submitPhoneOtp } from '@/states/user/fetch/register';

export function useOtpConfirmations(toNextStep) {
    const emailOtp = useOtp({
        sendFetch: () => sendEmailOtp(getWaitListID()),
        submitFetch: code => submitEmailOtp(getWaitListID(), code),
        handleSuccessSubmit: ({ waitListID }) => {
            toNextStep();
            setWaitListID(waitListID);
        }
    });
    
    const phoneOtp = useOtp({
        sendFetch: () => sendPhoneOtp(getWaitListID()),
        submitFetch: code => submitPhoneOtp(getWaitListID(), code),
        handleSuccessSubmit: ({ waitListID }) => {
            toNextStep();
            setWaitListID(waitListID);
        }
    });

    return {
        emailOtp,
        phoneOtp
    };
}