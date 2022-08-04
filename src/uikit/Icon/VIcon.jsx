import { ICONS } from '@/config';

function VIcon({ name }) {
    const icon = ICONS[`../app/assets/icons/${name}.svg`];

    return icon.default.render();
}

export default VIcon;