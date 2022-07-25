import { h } from 'vue';
import styles from './SkeletonBox.module.scss';


function SkeletonBox(_, { attrs: { classAtr = null } }) {
    return h(
        'div',
        {
            class: [
                styles.skeleton,
                classAtr
            ],
        }
    );
}

export default SkeletonBox;