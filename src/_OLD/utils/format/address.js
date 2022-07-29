export function formatAddressToShort(address) {
    if (address.length < 21) {
        return address;
    } else {
        return `${ address.substr(0, 8) }...${ address.substr(-8) }`;
    }
}