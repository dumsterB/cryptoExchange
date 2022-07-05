import { unref } from 'vue';
import logError from '../logger/error';

export async function getCountries(locale) {
    try {
        const countries = await import(`../../locales/countries/${ unref(locale) }.json`);

        return countries.default;
    } catch ({ message }) {
        logError(message);

        return [];
    }
}

export function filterCountries(search, countries, max) {
    if (!search)
        return countries.slice(0, max);

    const arr = [];
    const searchStr = search.toLowerCase();

    countries.some(country => {
        if (arr.length === max)
            return true;

        if (country.text.toLowerCase().substr(0, search.length) === searchStr)
            arr.push(country);
    });

    return arr;
}