import { objectToGetParams } from '../../utils/object';

export function reddit({ url, title }) {
    return (
        'https://www.reddit.com/submit' +
        objectToGetParams({
            url,
            title,
        })
    );
}