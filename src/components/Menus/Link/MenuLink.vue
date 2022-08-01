<script setup>
import { computed, useCssModule } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VIcon } from '@/uikit';

const props = defineProps({
    to: {
        type: [String, null],
        default: null
    },
    icon: {
        type: String,
        required: true
    }
});

const emit = defineEmits({
    click: null
});

const route = useRoute();
const router = useRouter();

const linkComponent = computed(() => props.to
    ? 'a'
    : 'button'
);

const styles = useCssModule('styles');
const linkClasses = computed(() => [
    styles.link, {
        [styles.active]: route.matched.some(
            ({ path }) => path === props.to
        )
    }
]);

const onClick = () => {
    if (props.to) {
        router.push(props.to);
    }

    emit('click');
};
</script>

<template>
    <component
        :is="linkComponent"
        :href="to"
        :class="linkClasses"
        @click.prevent="onClick"
    >

        <div :class="styles.icon">
            <VIcon :name="icon" />
        </div>

        <div :class="styles.text">
            <slot />
        </div>

    </component>
</template>

<style lang="scss" module="styles">
@import './MenuLink.module.scss';
</style>