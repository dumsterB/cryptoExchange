import PopperWrap from './Popper/PopperWrap.vue';

function VTooltip(_, { attrs, slots }) {
    return <PopperWrap
        {...attrs}
    >
        {{
            default: () => slots.default?.(),
            content: () => slots.content?.()
        }}
    </PopperWrap>;
}

export default VTooltip;