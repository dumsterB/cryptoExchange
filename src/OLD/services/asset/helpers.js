import { FIAT_TYPE } from "./types";

export function getFullName(symbol, chain, standard) {
    if (standard)
        return `${ symbol } (${ standard })`;

    if (chain)
        return `${ symbol } (${ chain })`;

    return symbol;
}

export function getNetwork(type, chain, standard) {
    if (type === FIAT_TYPE)
        return null;

    return standard
        ? `${ chain } (${ standard })`
        : chain;
}