import { VInput, VIcon } from '@/uikit';
import styles from './AppPopupSearch.module.scss';

function AppPopupSearch(props) {
    return <div class={styles.search}>
        <VInput
            {...props}
            view="surface"
            maxlength="64"
            class={styles.input}
        >
            {{
                'addon-left': () => <div class={styles.icon}>
                    <VIcon name="search" />
                </div>
            }}
        </VInput>
    </div>;
}

export default AppPopupSearch;