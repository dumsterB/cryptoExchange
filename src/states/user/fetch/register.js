import { apiClient } from '@/app/api/client';
import { MOCK_API_CALLS } from '@/config';

export async function startRegister({ email: login, phone, password, passwordConfirm }, refCode = null) {
    if (MOCK_API_CALLS)
        return {
            waitListID: Date.now()
        };

    const payload = {
        login,
        phone,
        password,
        confirmPassword: passwordConfirm
    };

    if (refCode) {
        payload.refCode = refCode;
    }

    const { message: { ID } } = await apiClient.post(
        '/auth/register',
        payload
    );

    return { waitListID: ID };
}

export async function sendEmailOtp(waitListID) {
    if (MOCK_API_CALLS)
        return {};

    return apiClient.post(
        '/waitlist/send',
        { waitListID }
    );
}

export async function submitEmailOtp(waitListID, code) {
    if (MOCK_API_CALLS)
        return {
            waitListID
        };

    const { message: { ID, ...result } } = await apiClient.post(
        '/waitlist/accept',
        { waitListID, code }
    );

    return {
        waitListID: ID,
        ...result
    };
}

export async function sendPhoneOtp(waitListID) {
    if (MOCK_API_CALLS)
        return {};
    
    return apiClient.post(
        '/waitlist/send',
        { waitListID }
    );
}

export async function submitPhoneOtp(waitListID, code) {
    if (MOCK_API_CALLS)
        return {
            waitListID
        };

    const { message: { ID, ...result } } = await apiClient.post(
        '/waitlist/accept',
        { waitListID, code }
    );

    return {
        waitListID: ID,
        ...result
    };
}

export async function sendPersonalInfo(waitListID, { name, surname, country }) {
    if (MOCK_API_CALLS)
        return {
            waitListID,
            accessToken: 'mocked_access_token',
            refreshToken: 'mocked_refresh_token'
        };

    const { message: { ID, ...result } } = await apiClient.post(
        '/waitlist/accept',
        { waitListID, firstName: name, lastName: surname, countryCode: country }
    );

    return {
        waitListID: ID,
        ...result
    };
}