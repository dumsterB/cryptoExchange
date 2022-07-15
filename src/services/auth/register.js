import { ls } from "@/utils/localStorage";
import { wrappedAsyncFunction } from "@/utils/wrappedFunction";
import { startRegister } from "../api/repositories/auth";
import { EMAIL_FIELD, PASSWORD_CONFIRM_FIELD, PHONE_FIELD } from "./fields";

function getErrorField(error) {
    switch (error) {
    case 'invalid_email':
        return EMAIL_FIELD;

    case 'user_already_registered':
        return EMAIL_FIELD;

    case 'phone_already_registered':
        return PHONE_FIELD;

    case 'passwords_do_not_match':
        return PASSWORD_CONFIRM_FIELD;
    }
}

async function register(form, setFieldError) {
    const { waitListId, error } = await startRegister(form);

    if (error) {
        const field = getErrorField(error);
        const errorKey = `errors.backend.auth.${ error }`;

        if (field){ 
            setFieldError(
                field,
                errorKey
            );
        }

        return { ok: false };
    }

    if (!waitListId)
        throw new Error('errors.somethingFailed');

    ls.set('register', { waitListId });

    return { ok: true };
}

export const handleRegister = wrappedAsyncFunction(register);