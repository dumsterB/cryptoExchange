import { ref } from 'vue'

const LS_TYPE = 'crypto-card-promo';

function getStateFromLs() {
    const { visible } = JSON.parse(localStorage.getItem(LS_TYPE)) ?? {};

    return visible ?? true;
}

export const visible = ref(getStateFromLs());

export function hide() {
    localStorage.setItem(
        LS_TYPE,
        JSON.stringify({
            visible: false
        })
    );

    visible.value = false;
}