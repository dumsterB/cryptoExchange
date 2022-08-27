import styles from './AppPopupClose.module.scss';
import { VIcon, VIconButton } from '@/uikit';

function AppPopupClose(props, { emit }) {
    return <VIconButton
        class={{ [styles.absolute]: !props.relative }}
        onClick={() => emit('click')}
    >
        <VIcon name="close" />
    </VIconButton>;
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