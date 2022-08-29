<script setup>
import { computed } from 'vue';
import { AppPopup, AppPopupHead, AppPopupBody } from '@/components/Popup';
import TokenIcon from '../Icon/TokenIcon.jsx';
import { formatTokenQuantity } from '@/utils/token';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    selectedToken: {
        type: Object,
        default: () => ({
            id: '',
            name: '',
            description: '',
            icon: '',
            value: '',
        })
    },
    allTokens: {
        type: Array,
        default: () => ([
            {
                id: '',
                name: '',
                description: '',
                icon: '',
                value: '',
            }
        ])
    },
    title: {
        type: String,
        default: ''
    },
    opened: Boolean
});

const emit = defineEmits({
    'update:opened': null,
    'select-token': null
});

const { t } = useI18n();

const isOpen = computed({
    set: val => emit('update:opened', val),
    get: () => props.opened
});

const selectToken = token => {
    emit('select-token', token);

    isOpen.value = false;
};
</script>

<template>
    <AppPopup v-model="isOpen">
        <AppPopupHead>
            {{ title || t('selectToken') }}
        </AppPopupHead>

        <AppPopupBody :class="styles.popupBody">
            <div
                v-for="({ id, name, description, icon, value }) in allTokens"
                :key="id"
                :class="styles.token"
                @click="selectToken({ id, name, icon })"
            >
                <TokenIcon
                    :image="icon"
                    size="l"
                    border
                    :class="styles.icon"
                />

                <div :class="styles.info">
                    <div :class="styles.name">
                        {{ name }}
                    </div>
                    <div
                        v-if="description"
                        :class="styles.description"
                    >
                        {{ description }}
                    </div>
                </div>

                <div
                    v-if="value"
                    :class="styles.value"
                >
                    {{ formatTokenQuantity(value) }}
                </div>
            </div>
        </AppPopupBody>
    </AppPopup>
</template>

<style lang="scss" module="styles">
@import './TokensSearchPopup.module.scss';
</style>