import { h } from 'vue';
import IconButton from '@/components/general/IconButton.vue';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';

function SettingsButton(_, { attrs, emit }) {
    return h(
        IconButton,
        {
            ...attrs,
            onClick: () => emit('click')
        },
        () => h(VIcon, { name: 'settings' })
    );
}

SettingsButton.emits = {
    click: null
};

export default SettingsButton;
