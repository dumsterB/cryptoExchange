import { objectToGetParams } from '../../utils/object';

export function telegram({ url, title }) {
    return ('https://telegram.me/share/url'
        + objectToGetParams({
            url,
            text: title,
        })
    );
}