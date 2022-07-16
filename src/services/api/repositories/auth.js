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

export async function startRegister({ email: login, phone, password, passwordConfirm }) {
    const { message: { ID } } = await apiClient.post(
        '/auth/register',
        { login, phone, password, confirmPassword: passwordConfirm }
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
        { waitListID, firstName: name, lastName: surname, country }
    );

    return {
        waitListID: ID,
        ...result
    };
}

// TODO: connect
export async function getUserMetadata() {
    // await sleep(0);

    return {
        name: 'Вадим',
        surname: 'Александров',
        avatar: '/images/dev/avatar.png',
        email: '',
        phone: '',
        countryCode: '',
        isVerified: false
    };
}

export function getNewTokens(refreshToken) {
    return apiClient.post(
        '/auth/refresh',
        { token: refreshToken }
    );
}