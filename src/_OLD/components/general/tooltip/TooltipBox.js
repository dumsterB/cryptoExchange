import { h } from "vue";
import PopperWrap from './view/popper/PopperWrap.vue';

function TooltipBox(_, { attrs, slots }) {
    return h(
        PopperWrap,
        {
            ...attrs
        },
        {
            default: () => slots.default?.(),
            content: () => slots.content?.()
        }
    );
}

export default TooltipBox;