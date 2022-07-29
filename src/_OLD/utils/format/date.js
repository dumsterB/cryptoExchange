import { useI18n } from 'vue-i18n'

let dateFormats;

const MS_IN_SECOND = 1000;

// TODO:
// Если язык обновляется с перезагрузкой, то все ок
// Если нет - пофиксить
function setupDateFormat() {
    let locale;

    // FIXME: не должны использовать useI18n
    try {
        const { l } = useI18n();

        locale = l;
    } catch (error) {
        locale = 'ru';
    }

    return {
        time: new Intl.DateTimeFormat(
            locale.value,
            {
                minute: '2-digit',
                hour: '2-digit'
            }
        ),
        beautifulDate: new Intl.DateTimeFormat(
            locale.value,
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        )
    }
}

function format(ts, type, unix) {
    if (!dateFormats) {
        dateFormats = setupDateFormat();
    }

    const date = new Date(ts * (unix ? MS_IN_SECOND : 1));
    const formatter = dateFormats[type];

    return formatter.format(date);
}

export function formatTsToBeautifulDate(timestamp, unix = true) {
    return format(timestamp, 'beautifulDate', unix);
}

export function formatTsToTime(timestamp) {
    return format(timestamp, 'time');
}