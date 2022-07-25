import { objectToGetParams } from '../../utils/object';
import { separator } from '../../utils/separator';

export function whatsapp({ url, title, isMobile }) {
    return (
        `https://${ isMobile ? 'api' : 'web' }.whatsapp.com/send` +
        objectToGetParams({
            text: title + separator + url,
        })
    );
}