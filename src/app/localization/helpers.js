import { languages } from '@/config/localization/languages';

export const LANGUAGE_LS_KEY = 'active_language';

export function getLanguageCodeFromLS() {
    try {
        return localStorage.getItem(LANGUAGE_LS_KEY) || languages.ru.code; // TODO: english language
    } catch (error) {
        return languages.en.code;
    }
}