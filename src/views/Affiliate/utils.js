import { BASE_URL } from '@/config';
import { REFERRAL_CODE_KEY } from '@/config/constants/affiliate';

export function ellipseLink(address) {
    const urlWidth = 22;
    const codeWidth = 9;

    return `${ address.slice(0, urlWidth) }...${ address.slice(-codeWidth) }`;
}

export function generateLink(code) {
    return `${ BASE_URL}?${ REFERRAL_CODE_KEY }=${ code }`;
}