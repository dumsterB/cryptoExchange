import { object, string } from 'yup';

import { handleSavePersonalInfo } from '@/services/auth/register/waitList';
import { COUNTRY_FIELD, NAME_FIELD, SURNAME_FIELD } from '@/services/auth/fields';

import { useI18n } from 'vue-i18n';
import { useField, useForm } from 'vee-validate';
import { useToast } from '../toast/useToast';

export function usePersonalInfoForm(loadingCb, saveCb) {
    const { t } = useI18n(); 
    const toast = useToast();

    // TODO: set full rules (min & max)
    const validationSchema = object({
        [NAME_FIELD]: string()
            .required(t('errors.empty')),
        [SURNAME_FIELD]: string()
            .required(t('errors.empty')),
        [COUNTRY_FIELD]: string()
            .required(t('errors.selectCountry'))
    });

    const { handleSubmit } = useForm({ validationSchema });

    const {
        value: name,
        errorMessage: nameError
    } = useField(NAME_FIELD);

    const {
        value: surname,
        errorMessage: surnameError
    } = useField(SURNAME_FIELD);

    const {
        value: country,
        errorMessage: countryError,
        setErrors: setCountryFieldError
    } = useField(COUNTRY_FIELD);

    const setCountryError = () => setCountryFieldError(t('errors.selectCountry'));
    const resetCountryError = () => setCountryFieldError('');

    const savePersonalInfo = handleSubmit(async fields => {
        loadingCb(true);

        const { ok, error } = await handleSavePersonalInfo(fields);

        loadingCb(false);

        if (error) {
            toast.open({
                view: 'danger',
                text: t(error)
            });
        }

        if (ok) {
            saveCb();
        }
    });

    return {
        savePersonalInfo,
        name,
        nameError,
        surname,
        surnameError,
        country,
        countryError,
        setCountryError,
        resetCountryError
    };
}