import styles from './VSkeletonLoader.module.scss';

function VSkeletonLoader(_, { attrs }) {
    return <div
        class={[
            styles.skeleton,
            attrs.class
        ]}
        style={attrs.style}
    />;
}

export default VSkeletonLoader;