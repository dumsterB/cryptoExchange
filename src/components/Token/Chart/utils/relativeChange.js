import { unref } from 'vue';
import { getLastElement } from './helpers';

function relativeChange(y, data) {
    const first = data[0] ?? unref(data)[0];
    const active = y
        ? { y }
        : getLastElement(data);

    if (!active)
        return 0;

    return ((active.y - first.y) * 100 / first.y).toFixed(2);
}

export default relativeChange;