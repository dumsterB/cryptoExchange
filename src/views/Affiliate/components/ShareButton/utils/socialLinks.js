import { objectToGetParams, separator } from './helpers';

function facebook({ url, quote, hashtag }) {
    return ('https://www.facebook.com/sharer/sharer.php'
        + objectToGetParams({
            u: url,
            quote,
            hashtag
        })
    );
}

function reddit({ url, title }) {
    return (
        'https://www.reddit.com/submit' +
        objectToGetParams({
            url,
            title,
        })
    );
}

function telegram({ url, title }) {
    return ('https://telegram.me/share/url'
        + objectToGetParams({
            url,
            text: title,
        })
    );
}

function twitter({
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

function whatsapp({ url, title, isMobile }) {
    return (
        `https://${ isMobile ? 'api' : 'web' }.whatsapp.com/send` +
        objectToGetParams({
            text: title + separator + url,
        })
    );
}

export default {
    facebook,
    reddit,
    telegram,
    twitter,
    whatsapp
};