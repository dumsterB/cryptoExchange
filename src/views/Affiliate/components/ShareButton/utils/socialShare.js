import links from './socialLinks';

const windowWidth = 600;
const windowHeight = 550;

export function createLink(network, data) {
    return links[network]?.(data);
}

export function shareBySocial(link) {
    const windowConfig = {
        width: windowWidth,
        height: windowHeight,
        ...getBoxPositionOnWindowCenter(
            windowWidth,
            windowHeight
        )
    };

    openWindow(
        link,
        windowConfig
    );
}

function openWindow(
    url,
    {
        height,
        width,
        ...configRest
    }
) {
    const config = {
        height,
        width,
        location: 'no',
        toolbar: 'no',
        status: 'no',
        directories: 'no',
        menubar: 'no',
        scrollbars: 'yes',
        resizable: 'no',
        centerscreen: 'yes',
        chrome: 'yes',
        ...configRest,
    };

    const shareDialog = window.open(
        url,
        '',
        Object.keys(config)
            .map(key => `${ key }=${ config[key] }`)
            .join(', ')
    );

    return shareDialog;
}

function getBoxPositionOnWindowCenter(width, height) {
    return {
        left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
        top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2,
    };
}