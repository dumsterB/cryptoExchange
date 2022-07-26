<script setup>
import FriendsTableRow from './row/FriendsTableRow.vue';
import EmptyPlaceholder from '@/2v/shared/components/empty/EmptyPlaceholder.vue';
import { useI18n } from 'vue-i18n';

defineProps({
    friends: {
        type: Array,
        default: () => ([])
    }
});

const { t } = useI18n();
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
                />
            </div>
        </template>

        <EmptyPlaceholder v-else />

    </div>
</template>

<style lang="scss" module="styles">
@import './FirendsTable.module.scss';
</style>