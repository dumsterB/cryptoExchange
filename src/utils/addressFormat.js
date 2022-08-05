export function ellipseAddress(value, width = 8) {
    return `${ value.substr(0, width) }...${ value.substr(-width) }`;
}