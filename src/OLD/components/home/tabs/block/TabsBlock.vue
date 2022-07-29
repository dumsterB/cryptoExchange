<script setup>
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n();

const tabs = ref([]);
const activeTab = ref('');

const registerTab = tab => {
    tabs.value.push(tab);
}

const unregisterTab = tabType => {
    tabs.value = tabs.value.filter(({ type }) => type !== tabType);
}

provide('activeTab', activeTab);
provide('registerTab', registerTab);
provide('unregisterTab', unregisterTab);

const selectTab = type => {
    activeTab.value = type;
}

onMounted(() => {
    selectTab(tabs.value[0].type);
});
</script>

<template>
    <div>

        <div :class="styles.head">
            <div>
                <button
                    v-for="({ type, title }) in tabs"
                    :key="type"
                    :class="[
                        styles.title,
                        { [styles.active]: type === activeTab }
                    ]"
                    @click="selectTab(type)"
                >
                    {{ t(title) }}
                </button>
            </div>

            <slot
                name="head"
                :active-tab="activeTab"
            />
        </div>

        <slot name="body" />

    </div>
</template>

<style lang="scss" module="styles">
@import './TabsBlock.module.scss';
</style>