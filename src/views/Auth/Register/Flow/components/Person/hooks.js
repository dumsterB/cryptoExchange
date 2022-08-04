import { object, string } from 'yup';
import { handleSavePersonalInfo } from '@/states/user/services/register';
import { fields } from '@/utils/auth';
import { useI18n } from 'vue-i18n';
import { useField, useForm } from 'vee-validate';
import { useToast } from '@/components/Toast';

export function usePersonalInfoForm(completeCb, loadingCb) {
    const { t } = useI18n(); 
    const toast = useToast();

    // TODO: set full rules (min & max)
    const validationSchema = object({
        [fields.NAME]: string()
            .required(t('errors.empty')),
        [fields.SURNAME]: string()
            .required(t('errors.empty')),
        [fields.COUNTRY]: string()
            .required(t('errors.selectCountry'))
    });

    const { handleSubmit } = useForm({ validationSchema });

    const {
        value: name,
        errorMessage: nameError
    } = useField(fields.NAME);

    const {
        value: surname,
        errorMessage: surnameError
    } = useField(fields.SURNAME);

    const {
        value: country,
        errorMessage: countryError,
        setErrors: setCountryFieldError
    } = useField(fields.COUNTRY);

    const setCountryError = () => setCountryFieldError(t('errors.selectCountry'));
    const resetCountryError = () => setCountryFieldError('');

    const savePersonalInfo = handleSubmit(async fields => {
        loadingCb(true);

        const { ok, error } = await handleSavePersonalInfo(fields);

        loadingCb(false);

        if (error) {
            toast.openDanger(t(error));
        }

        if (ok) {
            completeCb();
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