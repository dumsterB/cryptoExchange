export function getTokenFullName(symbol, chain, standard) {
    if (standard)
        return `${ symbol } (${ standard })`;

    if (chain)
        return `${ symbol } (${ chain })`;

    return symbol;
}

export function getTokenNetwork(chain, standard) {
    return standard
        ? `${ chain } (${ standard })`
        : chain;
}