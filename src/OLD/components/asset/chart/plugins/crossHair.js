import { getDatasetsBorderColor } from '../utils/datasets';
import { CURRENT_COLOR } from '../utils/types';

export function crossHairPlugin({
    verticalLineColor = 'black',
    horizontalLineColor = 'black',
    drawUnderTooltip = true
} = {}) {
    const draw = (e, tooltipHeight = 0) => {
        const activeElement = e.getActiveElements()[0];

        if (activeElement) {
            const {
                ctx,
                chartArea: { top, left, right, bottom }
            } = e;

            const { x, y } = activeElement.element.tooltipPosition();

            const newY = tooltipHeight + e.scales.yAxis?.top - top + 2;

            ctx.save();

            // vertical line
            ctx.beginPath();
            ctx.setLineDash([8, 8]);
            ctx.moveTo(x, newY);
            if (y - 7 > newY) {
                ctx.lineTo(x, y - 7);
                ctx.moveTo(x, y + 7);
            }
            ctx.lineTo(x, bottom);
            ctx.lineWidth = 1;
            ctx.strokeStyle = verticalLineColor;
            ctx.stroke();

            // horizontal line
            ctx.beginPath();
            ctx.setLineDash([8, 8]);
            ctx.moveTo(left, y);
            ctx.lineTo(x - 7, y),
            ctx.moveTo(x + 7, y),
            ctx.lineTo(right, y),
            ctx.lineWidth = 1;
            ctx.strokeStyle = horizontalLineColor === CURRENT_COLOR
                ? getDatasetsBorderColor(e)
                : horizontalLineColor;
            ctx.stroke();
            ctx.restore();
        }
    };

    return drawUnderTooltip
        ? {
            id: 'crossHairPlugin',
            beforeTooltipDraw: chart => draw(chart)
        }
        : {
            id: 'crossHairPlugin',
            afterTooltipDraw: (chart, { tooltip }) => draw(chart, tooltip?.height ?? 0)
        };
}