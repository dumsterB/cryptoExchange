import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';
import { getLanguageCodeFromLS } from './helpers';
import ru from './locales/ru';

// TODO: async load messages
const i18n = createI18n({
    legacy: false,
    locale: getLanguageCodeFromLS(),
    messages: {
        ru
    },
    pluralizationRules: {
        'ru': (choice, choicesLength) => {
            if (choice === 0) {
                return 0;
            }
    
            const teen = choice > 10 && choice < 20;
            const endsWithOne = choice % 10 === 1;
    
            if (choicesLength < 4) {
                return (!teen && endsWithOne) ? 1 : 2;
            }
            if (!teen && endsWithOne) {
                return 1;
            }
            if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
                return 2;
            }
    
            return (choicesLength < 4) ? 2 : 3;
        }
    }
});

export function setLanguage(locale) {
    i18n.global.locale.value = locale;

    document.querySelector('html').setAttribute('lang', locale);
}

export async function loadLocaleMessages(locale) {
    const messages = await import(`./locales/${ locale }/index.js`);

    i18n.global.setLocaleMessage(
        locale,
        messages.default
    );

    return nextTick();
}

export default i18n;