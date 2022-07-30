import apiClient from '../client/apiClient';

export async function loginToAccount({ login, password }) {
    const {
        message: {
            accessToken,
            refreshToken
        }
    } = await apiClient.post(
        '/auth/login',
        { login, password }
    );

    return {
        accessToken,
        refreshToken
    };
}

export function logoutFromAccount() {
    return apiClient.get('/auth/logout');
}

export async function startRegister({ email: login, phone, password, passwordConfirm }, refCode = null) {
    const { message: { ID } } = await apiClient.post(
        '/auth/register',
        { login, phone, password, confirmPassword: passwordConfirm, refCode }
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

export async function getUserMetadata() {
    // const { message } = await apiClient.get('/user/info');
    // console.log(message);

    // if (import.meta.env.DEV)
    return {
        name: 'Вадим',
        surname: 'Александров',
        avatar: '/images/dev/avatar.png',
        email: '',
        phone: '',
        countryCode: '',
        isVerified: false
    };

    // const { message } = await apiClient.get('/user/info');

    // return message;
}

export function getNewTokens(refreshToken) {
    return apiClient.post(
        '/auth/refresh',
        { token: refreshToken }
    );
}