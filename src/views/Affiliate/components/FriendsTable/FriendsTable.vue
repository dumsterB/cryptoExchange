<script setup>
import { EmptyPlaceholder } from '@/uikit';
import FriendsTableRow from './Row/FriendsTableRow';
import { useI18n } from 'vue-i18n';
import { useCurrencyStore } from '@/states/currency/store';

defineProps({
    friends: {
        type: Array,
        default: () => ([])
    }
});

const { t, locale } = useI18n();
const currencyStore = useCurrencyStore();
</script>

<template>
    <div :class="styles.table">

        <div :class="styles.title">
            {{ t('affiliate.invitedPeople') }}
        </div>

        <template v-if="friends.length">
            <div :class="styles.head">
                <div :class="styles.headCol">
                    {{ t('affiliate.friend') }}
                </div>
                <div :class="styles.headCol">
                    {{ t('affiliate.email') }}
                </div>
                <div :class="styles.headCol">
                    {{ t('affiliate.income') }}
                </div>
                <div :class="styles.headCol">
                    {{ t('affiliate.level') }}
                </div>
            </div>

            <div :class="styles.body">
                <FriendsTableRow
                    v-for="({ name, email, income, level }) in friends"
                    :key="email"
                    :name="name"
                    :email="email"
                    :income="income"
                    :level="level"
                    :locale="locale"
                    :currency-code="currencyStore.code"
                />
            </div>
        </template>

        <EmptyPlaceholder v-else />

    </div>
</template>

<style lang="scss" module="styles">
@import './FirendsTable.module.scss';
</style>