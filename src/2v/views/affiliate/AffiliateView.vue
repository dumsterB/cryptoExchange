<script setup>
import { onMounted, ref } from 'vue';
import AffiliateHero from './components/hero/AffiliateHero.vue';
import CurrencyNumber from '@/2v/entities/currency/components/number/CurrencyNumber';
import CountItem from './components/analytics/CountItem.vue';
import FriendsTable from './components/friends/FriendsTable.vue';
import VIcon from '@/2v/shared/components/common/icon/VIcon.vue';
import VSpin from '@/2v/shared/components/common/spin/VSpin.vue';
import TooltipBox from '@/2v/features/tooltip/TooltipBox';
import { formatCurrency } from '@/2v/entities/currency/utils/format';
import { generateLink } from './utils/link';
import { getAffiliateInfo } from './api/info';
import { getAffiliateFriends } from './api/friends';
import { useI18n } from 'vue-i18n';
import { useCurrencyStore } from '@/2v/entities/currency/store/currency';

const { t, locale } = useI18n();
const currencyStore = useCurrencyStore();

const affiliate = ref({});
const friends = ref([]);
const isLoading = ref(true);

// TODO:
// on api error - catch error and set in global store
onMounted(async () => {
    affiliate.value = await getAffiliateInfo();
    friends.value = await getAffiliateFriends();

    isLoading.value = false;
});
</script>

<template>
    <div
        v-if="isLoading"
        :class="styles.loadingPlaceholder"
    >
        <VSpin />
    </div>

    <template v-else>
        <AffiliateHero
            :code="affiliate.code"
            :link="generateLink(affiliate.code)"
        />

        <div :class="styles.analytics">
            <!-- TODO: add change prop -->
            <CountItem
                :change-format-fn="value => formatCurrency(value, locale, currencyStore.code)"
                :class="styles.countItem"
            >
                <template #label>
                    {{ t('affiliate.income') }}
                </template>

                <template #value>
                    <CurrencyNumber
                        :value="affiliate.income"
                        :currency-code="currencyStore.code"
                        :locale="locale"
                        :class="styles.currency"
                        :fraction-class="styles.currencyFraction"
                    />
                </template>
            </CountItem>

            <!-- TODO: add change prop -->
            <CountItem :class="styles.countItem">
                <template #label>
                    <span>
                        {{ t('affiliate.activeFriends') }}
                    </span>

                    <TooltipBox
                        placement="top"
                        hover
                        width="250"
                        :content="t('affiliate.activeFriendsHelp')"
                    >
                        <VIcon name="question-circle" />
                    </TooltipBox>
                </template>

                <template #value>
                    {{ affiliate.activeFriends }}
                </template>
            </CountItem>

            <!-- TODO: add change prop -->
            <CountItem :class="styles.countItem">
                <template #label>
                    <span>
                        {{ t('affiliate.friends') }}
                    </span>

                    <TooltipBox
                        placement="top"
                        hover
                        width="250"
                        :content="t('affiliate.allFriendsHelp')"
                    >
                        <VIcon name="question-circle" />
                    </TooltipBox>
                </template>

                <template #value>
                    {{ affiliate.allFriends }}
                </template>
            </CountItem>
        </div>

        <div :class="styles.start">
            <div :class="styles.startTitle">
                {{ t('affiliate.howToStart') }}
            </div>
            
            <div :class="styles.startList">
                <div :class="styles.step">
                    <div
                        :class="styles.stepImage"
                        :style="{ backgroundImage: 'url(/images/affiliate/step-1.png)' }"
                    />

                    <div :class="styles.stepNum">
                        {{ t('affiliate.step', { num: 1 }) }}
                    </div>

                    <div :class="styles.stepText">
                        Поделитесь реферальной<br /> ссылкой с другом
                    </div>
                </div>

                <div :class="styles.step">
                    <div
                        :class="styles.stepImage"
                        :style="{ backgroundImage: 'url(/images/affiliate/step-2.png)' }"
                    />

                    <div :class="styles.stepNum">
                        {{ t('affiliate.step', { num: 2 }) }}
                    </div>

                    <div :class="styles.stepText">
                        Пригласите друга зарегистрироваться<br /> и совершить покупку, обмен или продажу
                    </div>
                </div>

                <div :class="styles.step">
                    <div
                        :class="styles.stepImage"
                        :style="{ backgroundImage: 'url(/images/affiliate/step-3.png)' }"
                    />

                    <div :class="styles.stepNum">
                        {{ t('affiliate.step', { num: 3 }) }}
                    </div>

                    <div :class="styles.stepText">
                        Получайте<br /> вознаграждение
                    </div>
                </div>
            </div>
        </div>

        <FriendsTable :friends="friends" />
    </template>
</template>

<style lang="scss" module="styles">
@import './AffiliateView.module.scss';
</style>