import { h } from 'vue';
import IconButton from '@/components/general/IconButton.vue';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';
import { useMainStore } from '@/stores/main';

function BalanceButton(_, { attrs }) {
    const mainStore = useMainStore();

    const toggleBalances = () => {
        mainStore.hideBalances = !mainStore.hideBalances;
    };

    return h(
        IconButton,
        {
            ...attrs,
            onClick: () => toggleBalances()
        },
        () => mainStore.hideBalances
            ? h(VIcon, { name: 'eye-off' })
            : h(VIcon, { name: 'eye' })
    );
}

export default BalanceButton;