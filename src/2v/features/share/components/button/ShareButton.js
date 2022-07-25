import { h } from 'vue';
import styles from './ShareButton.module.scss';
import { createLink, shareBySocial } from '../../services/social';

function ShareButton(
    {
        network,
        url,
        title,
        description,
        media,
        mobile: isMobile
    },
    { attrs, slots, emit }
) {
    const link = createLink(network, {
        url,
        title,
        description,
        media,
        isMobile
    });
    
    return h(
        'button',
        {
            class: [
                styles.button,
                attrs.class
            ],
            onClick: () => {
                if (link) {
                    shareBySocial(link);
                }

                emit('click');
            }
        },
        slots.default?.()
    );
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