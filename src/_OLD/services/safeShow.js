import { h } from 'vue';

const SVG_WIDTH_EM = 3;
const RECT_WIDTH_EM = 0.5;
const RECT_HEIGHT_EM = 0.5;

const COLORS = [
    'var(--hidden-sum-color-100)',
    'var(--hidden-sum-color-200)',
    'var(--hidden-sum-color-300)',
    'var(--hidden-sum-color-400)',
    'var(--hidden-sum-color-500)'
];

function createRect(x, y) {
    return h('rect', {
        'width': '0.5em',
        'height': '0.5em',
        'fill': COLORS[ Math.floor(Math.random() * COLORS.length) ],
        'x': `${ x }em`,
        'y': `${ y }em`,
    });
}

export function createBlurSvg(height) {
    const width = height * SVG_WIDTH_EM;

    const rectWidth = height * RECT_WIDTH_EM;
    const rectsCount = Math.floor(width / rectWidth);

    if (!rectsCount)
        return [];

    const pieces = [...Array(rectsCount).keys()];

    const rects = [
        ...pieces.map(i => createRect(i * RECT_WIDTH_EM, 0)),
        ...pieces.map(i => createRect(i * RECT_WIDTH_EM, RECT_HEIGHT_EM))
    ];

    return h(
        'svg',
        {
            width: '3em',
            height: '1em',
            style: {
                fontSize: '1em',
                borderRadius: '0.25em'
            }
        },
        rects
    );
}