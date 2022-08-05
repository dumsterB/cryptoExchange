import { getDatasetsBorderColor, CURRENT_COLOR } from '../helpers';

export function activePointCirclePlugin({
    innerColor = 'currentColor',
    outerColor = 'black'
} = {}) {
    const isCurrentColor = CURRENT_COLOR === innerColor;
    const shadowColor = 'rgba(0, 0, 0, 0.1)';

    return {
        id: 'activePointCirclePlugin',
        beforeTooltipDraw: chart => {
            const activeElement = chart.getActiveElements()[0];

            if (activeElement) {
                const { ctx } = chart;
                const { x, y } = activeElement.element.tooltipPosition();

                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, 2 * Math.PI, !1);
                ctx.shadowColor = shadowColor;
                ctx.shadowBlur = 25;
                ctx.fillStyle = outerColor;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI, !1);
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.fillStyle = isCurrentColor
                    ? getDatasetsBorderColor(chart)
                    : innerColor;
                ctx.fill();
                ctx.restore();
            }
        }
    };
}