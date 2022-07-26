<script setup>
import { computed, useCssModule } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCurrencyStore } from '@/2v/entities/currency/store/currency';
import { formatCurrency } from '@/2v/entities/currency/utils/format';
import { levelColors } from '../../../utils/level';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});

const styles = useCssModule('styles');
const { locale } = useI18n();
const currencyStore = useCurrencyStore();

const incomeClasses = computed(() => ([
    styles.income,
    { [styles.green]: props.income > 0 }
]));

const levelColor = levelColors[props.level] ?? {};
</script>

<template>
    <div :class="styles.friend">
        <div :class="styles.col">
            <div :class="styles.name">
                {{ name }}
            </div>

            <div :class="styles.email">
                {{ email }}
            </div>
        </div>

        <div :class="styles.col">
            <div :class="styles.email">
                {{ email }}
            </div>
        </div>

        <div :class="styles.col">
            <div :class="incomeClasses">
                {{ formatCurrency(income, locale, currencyStore.code) }}
            </div>
        </div>

        <div :class="styles.col">
            <div
                :class="styles.level"
                :style="{
                    color: levelColor.typo,
                    backgroundColor: levelColor.fill,
                    borderColor: levelColor.stroke,
                    boxShadow: `${ levelColor.stroke } 0px 2px 0px 0`
                }"
            >
                {{ level }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" module="styles">
@import './FriendsTableRow.module.scss';
</style>