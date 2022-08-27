// import { reactive } from 'vue';
import router from '@/app/router';
import { loginWithCredentials } from './login';
// import { startRegister, sendEmailOtp, submitEmailOtp, sendPhoneOtp, submitPhoneOtp, sendPersonalInfo } from '../fetch/register';
import { startRegister, sendPersonalInfo } from '../fetch/register';
// import { useI18n } from 'vue-i18n';
// import { useToast } from '@/components/Toast';
import { AccessToken, RefreshToken, fields } from '@/utils/auth';
import localStorage from '@/utils/localStorage';
import wrappedAsyncFunction from '@/utils/wrappedAsyncFunction';

// TODO: refactoring file to store actions
const LS_REGISTER_KEY = 'register';

function getErrorField(error) {
    switch (error) {
    case 'errors.invalid_email':
        return fields.EMAIL;

    case 'errors.user_already_registered':
        return fields.EMAIL;

    case 'errors.phone_already_registered':
        return fields.PHONE;

    case 'errors.passwords_do_not_match':
        return fields.PASSWORD_CONFIRM;
    }
}

const wrappedStartRegister = wrappedAsyncFunction(startRegister);

async function register(form, setFieldError) {
    const refCode = localStorage.get('ref-code') ?? null; // TODO: fix
    const { waitListID, error } = await wrappedStartRegister(form, refCode);

    if (error) {
        const field = getErrorField(error);

        if (field){ 
            setFieldError(
                field,
                error
            );
        } else {
            throw new Error(error);
        }

        return { ok: false };
    }

    if (!waitListID)
        throw new Error('errors.somethingFailed');

    localStorage.set(LS_REGISTER_KEY, { waitListID });

    return { ok: true };
}

export const handleRegister = wrappedAsyncFunction(register);

export function getWaitListID() {
    const waitListID = localStorage.get(LS_REGISTER_KEY)?.waitListID;

    if (waitListID) {
        return waitListID;
    } else {
        throw new Error('errors.somethingFailed');
    }
}

export function setWaitListID(waitListID) {
    localStorage.set(LS_REGISTER_KEY, { waitListID });
}

async function savePersonalInfo(form) {
    const {
        accessToken,
        refreshToken
    } = await sendPersonalInfo(getWaitListID(), form) || {};

    if (!accessToken || !refreshToken)
        throw new Error('errors.somethingFailed');

    localStorage.remove(LS_REGISTER_KEY);
    localStorage.remove('ref-code'); // TODO: fix ref code

    AccessToken.set(accessToken);
    RefreshToken.set(refreshToken);

    await loginWithCredentials();

    return { ok: true };
}

export const handleSavePersonalInfo = wrappedAsyncFunction(savePersonalInfo);