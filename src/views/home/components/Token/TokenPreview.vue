<script setup>
import { computed } from 'vue';
import { SafeShow } from '@/components/Currency';
import { TokenIcon } from '@/components/Token';
import { formatCurrency } from '@/utils/currency';
import { formatTokenQuantity } from '@/utils/token';
import { useI18n } from 'vue-i18n';
import { useCurrencyStore } from '@/2v/entities/currency/store/currency';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    chain: {
        type: [String, null],
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    decimals: {
        type: Number,
        default: 2
    },
    standard: {
        type: [String, null],
        default: ''
    },
    price: {
        type: Number,
        required: true
    },
    iconUrl: {
        type: String,
        required: true
    }
});

const { locale } = useI18n();
const currencyStore = useCurrencyStore();

const link = computed(() => {
    return `/explore/${ props.id }`;
});

const quantity = computed(() => formatTokenQuantity(
    props.value,
    props.decimals
));

const cost = computed(() => formatCurrency(
    props.value * props.price,
    locale.value,
    currencyStore.code
));

const priceValue = computed(() => formatCurrency(
    props.price,
    locale.value,
    currencyStore.code
));

const network = computed(() => {
    if (props.standard)
        return props.standard;

    return props.chain;
});
</script>

<template>
    <div :class="styles.item">
        <RouterLink
            :to="link"
            :class="styles.link"
        >

            <div :class="styles.metadata">
                <TokenIcon
                    :image="iconUrl"
                    size="l"
                    :class="styles.metadataIcon"
                />

                <div
                    :class="[
                        styles.metadataText,
                        { [styles.noChain]: !network }
                    ]"
                >
                    <div :class="styles.symbol">
                        <span>
                            {{ symbol }}
                        </span>

                        <span
                            v-if="network"
                            :class="styles.symbolChain"
                        >
                            ({{ network }})
                        </span>
                    </div>

                    <div
                        v-if="network"
                        :class="styles.chain"
                    >
                        {{ network }}
                    </div>

                    <div :class="styles.noteMobile">
                        {{ priceValue }}
                    </div>
                </div>
            </div>

            <div :class="styles.text">
                {{ priceValue }}
            </div>

            <div :class="styles.text">
                <SafeShow>
                    {{ quantity }}
                </SafeShow>
            </div>

            <div :class="[styles.text, styles.cost]">
                <SafeShow>
                    {{ cost }}
                </SafeShow>
            </div>

            <div :class="styles.total">
                <div :class="styles.totalValue">
                    {{ quantity }}
                </div>

                <div :class="styles.totalPrice">
                    ≈ {{ cost }}
                </div>
            </div>
        
        </RouterLink>
    </div>
</template>

<style lang="scss" module="styles">
@import './CoinPreview.module.scss';
</style>