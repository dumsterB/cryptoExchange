const ALL_SIZES = ['1x', '2x'];

const DEFAULT_SIZE = '1x';

function getPathParts(str) {
    const parts = str.split('/') ?? [];

    const file = parts.pop();
    const path = parts.join('/');

    const name = file.replace(/\.[^/.]+$/, '');
    const extension = file.replace(/^.*?\.([a-zA-Z0-9]+)$/, '$1');

    return {
        path,
        name,
        extension
    };
}

function createPathWithSize(
    path,
    name,
    extension,
    size
) {
    const pathWithName = `${ path }/${ name }`;

    if (size === DEFAULT_SIZE)
        return `${ pathWithName }.${ extension } ${ size }`;
        
    return `${ pathWithName }@${ size }.${ extension } ${ size }`;
}

export function createImageSrc(src) {
    const {
        path,
        name,
        extension
    } = getPathParts(src);

    return ALL_SIZES
        .map(size => createPathWithSize(path, name, extension, size))
        .join(', ');
}