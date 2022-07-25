export function objectToGetParams(obj) {
    const params = Object.entries(obj)
        .filter(
            ([, value]) => value !== undefined && value !== null
        )
        .map(
            ([key, value]) => `${ encodeURIComponent(key) }=${ encodeURIComponent(String(value)) }`
        );

    return params.length > 0
        ? `?${ params.join('&') }`
        : '';
}