import { ls } from "@/utils/localStorage";
import { wrappedAsyncFunction } from "@/utils/wrappedFunction";
import { startRegister } from "@/services/api/repositories/auth";
import { EMAIL_FIELD, PASSWORD_CONFIRM_FIELD, PHONE_FIELD } from "../fields";
import { REGISTER_STORAGE_KEY } from "./storage";

const wrappedStartRegister = wrappedAsyncFunction(startRegister);

function getErrorField(error) {
    switch (error) {
    case 'errors.invalid_email':
        return EMAIL_FIELD;

    case 'errors.user_already_registered':
        return EMAIL_FIELD;

    case 'errors.phone_already_registered':
        return PHONE_FIELD;

    case 'errors.passwords_do_not_match':
        return PASSWORD_CONFIRM_FIELD;
    }
}

async function register(form, setFieldError) {
    const refCode = ls.get('ref-code') ?? null;
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

    ls.set(REGISTER_STORAGE_KEY, { waitListID });

    return { ok: true };
}

export const handleRegister = wrappedAsyncFunction(register);