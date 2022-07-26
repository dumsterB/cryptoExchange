export function ellipseLink(address) {
    const urlWidth = 22;
    const codeWidth = 9;

    return `${ address.slice(0, urlWidth) }...${ address.slice(-codeWidth) }`;
}

export function generateLink(code) {
    return `https://app.whitex.finance?ref=${ code }`;
}