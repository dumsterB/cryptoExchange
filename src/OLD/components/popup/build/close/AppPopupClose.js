import { h } from "vue";
import styles from './AppPopupClose.module.scss';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';
import IconButton from '@/components/general/IconButton.vue';

function AppPopupClose(props, { attrs, emit }) {
    return h(
        IconButton,
        {
            class: [
                attrs.class,
                { [styles.absolute]: !props.relative }
            ],
            onClick: () => emit('click')
        },
        () => [
            h(VIcon, { name: 'close' })
        ]
    );
}

AppPopupClose.props = {
    relative: {
        type: Boolean,
        default: false
    }
};

AppPopupClose.emits = {
    click: null
};

export default AppPopupClose;