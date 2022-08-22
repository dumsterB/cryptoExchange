import { useOtp } from '@/hooks/useOtp';
import { useWaitList, waitLists } from '@/states/user/hooks/useWaitList';
import { sendPasswordResetOtp, submitPasswordResetOtp } from '@/states/user/fetch/resetPassword';

// return otp confirmation
export function useOtpForm(onSuccessSubmit) {
    const waitList = useWaitList(waitLists.RESET_PASSWORD);

    const sendFetch = () => sendPasswordResetOtp(waitList.id.value);

    const submitFetch = code => submitPasswordResetOtp(
        waitList.id.value,
        code
    );

    const handleSuccessSubmit = ({ waitListID }) => {
        waitList.update(waitListID);
        onSuccessSubmit();
    };

    const otp = useOtp({
        sendFetch,
        submitFetch,
        handleSuccessSubmit
    });

    return otp;
}