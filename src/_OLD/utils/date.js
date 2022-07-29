const MS_IN_SECOND = 1000;

export function tsToDate(timestamp, formatterFn) {
    const date = new Date(timestamp * MS_IN_SECOND);

    return formatterFn(date);
}