import { activePointCirclePlugin } from './activeCirclePoint';
import { crossHairPlugin } from './crossHair';
import { relativeColorPlugin } from './relativeColor';

const plugins = colors => ([
    crossHairPlugin({
        verticalLineColor: colors.crosshairLine,
        horizontalLineColor: colors.crosshairLine,
    }),
    activePointCirclePlugin({
        outerColor: colors.pointCircle.outer,
        innerColor: colors.pointCircle.inner
    }),
    relativeColorPlugin({
        upColor: colors.relative.up,
        downColor: colors.relative.down
    }),
    // tooltipPlugin({})
]);

export default plugins;