import PopperWrap from './Popper/PopperWrap.vue';

function VTooltip(props, { slots }) {
    return <PopperWrap
        {...props}
    >
        {{
            default: () => slots.default?.(),
            content: () => slots.content?.()
        }}
    </PopperWrap>;
}

export default VTooltip;