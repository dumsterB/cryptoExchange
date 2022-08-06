import { getFormatter } from './formatter';

export function formatTimestamp(value, locale) {
    const formatter = getFormatter(locale);

    return formatter.format(value);
}