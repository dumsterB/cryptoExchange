import { objectToGetParams } from '../../utils/object';

export function twitter({
    url,
    title,
    via,
    hashtags = [],
    related = []
}) {
    return (
        'https://twitter.com/share' +
        objectToGetParams({
            url,
            text: title,
            via,
            hashtags: hashtags.length > 0 ? hashtags.join(',') : undefined,
            related: related.length > 0 ? related.join(',') : undefined,
        })
    );
}