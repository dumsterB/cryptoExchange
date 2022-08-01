
import styles from './VAvatar.module.scss';

function VAvatar({ image }) {
    return <div
        class={styles.avatar}
        style={{ backgroundImage: `url(${image})` }}
    ></div>;
}

VAvatar.props = {
    image: {
        type: String,
        default: ''
    }
};

export default VAvatar;