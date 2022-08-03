import { apiClient } from '@/app/api/client';

export async function startRegister({ email: login, phone, password, passwordConfirm }, refCode = null) {
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
    return apiClient.post(
        '/waitlist/send',
        { waitListID }
    );
}

export async function submitEmailOtp(waitListID, code) {
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
    return apiClient.post(
        '/waitlist/send',
        { waitListID }
    );
}

export async function submitPhoneOtp(waitListID, code) {
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
    const { message: { ID, ...result } } = await apiClient.post(
        '/waitlist/accept',
        { waitListID, firstName: name, lastName: surname, countryCode: country }
    );

    return {
        waitListID: ID,
        ...result
    };
}