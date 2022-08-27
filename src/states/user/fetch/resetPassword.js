import { apiClient } from '@/app/api/client';
import { MOCK_API_CALLS } from '@/config';

export async function requestPasswordReset(login) {
    if (MOCK_API_CALLS)
        return {
            waitListID: Date.now()
        };

    const { message: { waitListID } } = await apiClient.post(
        '/auth/restore',
        { login }
    );
    
    return {
        waitListID: waitListID
    };
}

export async function sendPasswordResetOtp(waitListID) {
    if (MOCK_API_CALLS)
        return {};

    return apiClient.post(
        '/waitList/send',
        { waitListID: waitListID }
    );
}

export async function submitPasswordResetOtp(waitListID, code) {
    if (MOCK_API_CALLS)
        return {
            waitListID: Date.now()
        };

    const { message: { ID, ...result } } = await apiClient.post(
        '/waitlist/accept',
        {
            code,
            waitListID: waitListID
        }
    );
    
    return {
        waitListID: ID,
        ...result
    };
}

export async function saveNewPassword(waitListID, password, confirmPassword) {
    if (MOCK_API_CALLS)
        return {
            ok: true
        };

    const { message } = await apiClient.post(
        '/waitList/accept',
        {
            waitListID: waitListID,
            newPassword: password,
            confirmedPassword: confirmPassword
        }
    );

    return {
        ok: message === 'ok'
    };
}