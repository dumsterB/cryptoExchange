<script setup>
import { computed, useCssModule } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VIcon from '@/components/common/icon/VIcon.vue'

const styles = useCssModule('styles');

const props = defineProps({
    to: {
        type: String,
        default: '#'
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

const linkClasses = computed(() => { 
    return [styles.link, {
        [styles.active]: route.matched.some(({ path }) => path === props.to)
    }]
});

const onClick = () => {
    if (props.to)
        return router.push(props.to);

    emit('click');
}
</script>

<template>
    <a
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

    </a>
</template>

<style lang="scss" module="styles">
@import './MenuLink.module.scss';
</style>