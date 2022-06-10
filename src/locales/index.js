// import { createI18n } from 'vue-i18n'
// import ru from './ru'

// const locale = 'ru';

// const i18n = createI18n({
//     legacy: false,
//     locale,
//     messages: {
//         [locale]: ru
//     }
// })

// async function loadLocaleMessages(locale) {
//     const messages = await import(`./${ locale }.js`);
  
//     i18n.global.setLocaleMessage(
//         locale,
//         messages.default
//     );
  
//     return messages.default;
// }

// export async function setI18nLanguage(locale) {
//     if (i18n.mode === 'legacy') {
//         i18n.global.locale = locale
//     } else {
//         i18n.global.locale.value = locale
//     }

//     if (!i18n.global.availableLocales.includes(locale)) {
//         await loadLocaleMessages(locale);
//     }

//     document.querySelector('html').setAttribute('lang', locale);
// }

// export default i18n;



import { createI18n } from 'vue-i18n'
import ru from './ru'
import en from './en'
import { getInitialLanguage } from '@/services/language'

const i18n = createI18n({
    legacy: false,
    locale: getInitialLanguage(),
    // fallbackLocale: 'en',
    messages: {
        en,
        ru
    }
});

export default i18n;