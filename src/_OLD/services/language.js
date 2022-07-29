import { ls } from "@/utils/localStorage";

export const AVAILABLE_LOCALES = [
    {
        id: 'ru',
        name: 'Русский',
        image: '/images/locales/ru.png'
    },
    {
        id: 'en',
        name: 'English',
        image: '/images/locales/en.png'
    }
]

const LANGUAGE_LS_TYPE = 'language';

export function updateLanguage(activeLocale, newLocale) {
    activeLocale.value = newLocale;

    ls.set(LANGUAGE_LS_TYPE, newLocale);
}

export function getActiveLanguage(activeLocale) {
    return AVAILABLE_LOCALES.find(
        ({ id }) => id === activeLocale
    );
}

export function getInitialLanguage() {
    const locale = ls.get(LANGUAGE_LS_TYPE);

    return locale ?? AVAILABLE_LOCALES[0].id;
}