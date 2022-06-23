import { h } from 'vue';
import IconButton from '@/components/general/IconButton.vue';
import VIcon from '@/components/common/icon/VIcon.vue';

function BalanceButton(_, { attrs, emit }) {
    return h(
        IconButton,
        {
            ...attrs,
            onClick: () => emit('click')
        },
        () => h(VIcon, { name: 'burger' })
    )
}

BalanceButton.emits = {
    click: null
}

export default BalanceButton;