import { objectToGetParams } from '../../utils/object';

export function facebook({ url, quote, hashtag }) {
    return ('https://www.facebook.com/sharer/sharer.php'
        + objectToGetParams({
            u: url,
            quote,
            hashtag
        })
    );
}