// незавершенная версия
export function tooltipPlugin(text) {
    const font = new FontFace(
        'NormalidadCompactLight',
        'url(/fonts/NormalidadCompactLight.woff2)'
    );

    let fontLoaded;

    font.load().then(
        () => fontLoaded = true
    );

    return {
        id: 'tooltipPlugin',
        beforeTooltipDraw: chart => {
            const activeElement = chart.getActiveElements()[0];

            if (activeElement && fontLoaded) {
                const { ctx } = chart;
                const { x, y } = activeElement.element.tooltipPosition();

                const padding = {
                    top: 6,
                    left: 12,
                    right: 12,
                    bottom: 6
                };

                console.log(text);

                const radius = 16;
                const text_info = ctx.measureText(text.value);
                const height = parseFloat(ctx.font.match(/\d+/).pop()) + padding.top + padding.bottom;
                const width = text_info.width + padding.left + padding.right;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.fillStyle = '#FFFFFF';
                ctx.fill();

                ctx.beginPath();
                ctx.font = 'normal 14px Normalidad';
                ctx.fillStyle = '#000000';
                ctx.textBaseline = 'top';
                ctx.fillText(text.value, x + padding.left - 1, y + padding.top);
                ctx.restore();
            }
        }
    };
}