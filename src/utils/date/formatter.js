export function getFormatter(locale, type = 'full') {
    return dateFormats[type](locale);
}

const dateFormats = {
    full: locale => new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }),
    time: locale => new Intl.DateTimeFormat(locale, {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
    })
};