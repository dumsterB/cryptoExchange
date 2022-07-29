import { reactive } from "vue";

import { loginWithTokens } from "../login";
import { sendEmailOtp, sendPersonalInfo, sendPhoneOtp, submitEmailOtp, submitPhoneOtp } from "@/services/api/repositories/auth";

import router from "@/router";
import AccessToken from "../tokens/AccessToken";
import RefreshToken from "../tokens/RefreshToken";

import { useI18n } from "vue-i18n";
import { useToast } from "@/hooks/toast/useToast";

import { ls } from "@/utils/localStorage";
import { wrappedAsyncFunction } from "@/utils/wrappedFunction";

const REGISTER_STORAGE_KEY = 'register';

function getWaitListID() {
    const waitListID = ls.get(REGISTER_STORAGE_KEY)?.waitListID;

    if (waitListID) {
        return waitListID;
    } else {
        router.push('/register');

        throw new Error('errors.somethingFailed');
    }
}

export function setWaitListID(ID) {
    ls.set(REGISTER_STORAGE_KEY, { waitListID: ID });
}

const sendOtp = wrappedAsyncFunction(async apiCallback => {
    const { error } = await apiCallback(getWaitListID());

    return { error };
});

const submitOtp = wrappedAsyncFunction(async (code, apiCallback) => {
    const { waitListID, error } = await apiCallback(getWaitListID(), code);

    return { waitListID, error };
});

function useOtpConfirm({
    sendRequest,
    submitRequest
}) {
    const { t } = useI18n();
    const toast = useToast();

    const state = reactive({
        error: false,
        loading: false
    });

    const send = async setTimer => {
        state.loading = true;

        const { error } = await sendOtp(sendRequest) ?? {};

        state.loading = false;

        if (error) {
            toast.open({
                view: 'danger',
                text: t(error)
            });
        } else {
            setTimer?.();
        }
    };

    const submit = async (code, successCallback) => {
        state.loading = true;

        const { waitListID, error } = await submitOtp(code, submitRequest) ?? {};

        state.loading = false;

        if (error) {
            toast.open({
                view: 'danger',
                text: t(error)
            });
        } else {
            setWaitListID(waitListID);
            successCallback?.();
        }
    };

    return {
        state,
        send,
        submit
    };
}

export function useEmailOtpConfirm() {
    const otp = useOtpConfirm({
        sendRequest: sendEmailOtp,
        submitRequest: submitEmailOtp
    });

    return otp;
}

export function usePhoneOtpConfirm() {
    const otp = useOtpConfirm({
        sendRequest: sendPhoneOtp,
        submitRequest: submitPhoneOtp
    });

    return otp;
}

async function savePersonalInfo(form) {
    const {
        accessToken,
        refreshToken
    } = await sendPersonalInfo(getWaitListID(), form);

    if (!accessToken || !refreshToken) {
        throw new Error('errors.somethingFailed');
    }

    ls.remove(REGISTER_STORAGE_KEY);
    ls.remove('ref-code'); // TODO: fix ref code

    AccessToken.set(accessToken);
    RefreshToken.set(refreshToken);

    await loginWithTokens();

    return { ok: true };
}

export const handleSavePersonalInfo = wrappedAsyncFunction(savePersonalInfo);