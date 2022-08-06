import styles from './ShareButton.module.scss';
import { createLink, shareBySocial } from './utils/socialShare';

function ShareButton(
    {
        network,
        url,
        title,
        description,
        media,
        mobile: isMobile
    },
    { slots, emit }
) {
    const link = createLink(network, {
        url,
        title,
        description,
        media,
        isMobile
    });

    const onClick = () => {
        if (link) {
            shareBySocial(link);
        }

        emit('click');
    };

    return <button
        class={styles.button}
        onClick={onClick}
    >
        {slots.default?.()}
    </button>;
}

ShareButton.props = {
    network: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    media: {
        type: String,
        default: ''
    },
    mobile: Boolean
};

ShareButton.emits = {
    click: null
};

export default ShareButton;