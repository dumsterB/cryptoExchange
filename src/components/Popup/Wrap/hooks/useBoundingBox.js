import { onMounted, onUnmounted, reactive, ref, toRefs } from 'vue';

export function useBoundingBox(isPane, paneActivator) {
    const isPaneLeft = ref(false);
    const PANE_BREAKPOINT = 1200;

    const paneBoundingBoxPosition = reactive({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    });

    if (!isPane)
        return {
            isPaneLeft,
            ...toRefs(paneBoundingBoxPosition)
        };

    const updatePaneBoundingBox = () => {
        const windowWidth = window.innerWidth;
    
        if (windowWidth <= PANE_BREAKPOINT) {
            paneBoundingBoxPosition.top = paneBoundingBoxPosition.left = paneBoundingBoxPosition.right = paneBoundingBoxPosition.bottom = 0;
    
            return;
        }
    
        const activator = paneActivator.getBoundingClientRect();
        
        const top = activator.top + activator.height;
        const left = activator.left;
        const right = window.innerWidth - (activator.left + activator.width);
        const bottom = 0;
    
        const isLeftPosition = left < right;
    
        paneBoundingBoxPosition.top = top;
        paneBoundingBoxPosition.bottom = bottom;
    
        if (isLeftPosition) {
            paneBoundingBoxPosition.left = left;
            paneBoundingBoxPosition.right = 0;
        } else {
            paneBoundingBoxPosition.left = 0;
            paneBoundingBoxPosition.right = right;
        }
    
        isPaneLeft.value = isLeftPosition;
    };
    
    onMounted(() => {
        updatePaneBoundingBox();
        
        window.addEventListener('scroll', updatePaneBoundingBox, { passive: true });
        window.addEventListener('resize', updatePaneBoundingBox, { passive: true });
    });
    
    onUnmounted(() => {
        window.removeEventListener('scroll', updatePaneBoundingBox, { passive: true });
        window.removeEventListener('resize', updatePaneBoundingBox, { passive: true });
    });

    return {
        isPaneLeft,
        ...toRefs(paneBoundingBoxPosition)
    };
}