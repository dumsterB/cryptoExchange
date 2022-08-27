import { VIconButton, VIcon } from '@/uikit';
import { useChartPopup } from '@/states/token/hooks/useChartPopup';

function ChartButton() {
    const { open } = useChartPopup();

    return <VIconButton onClick={() => open()}>
        <VIcon name="graph" />
    </VIconButton>;
}

export default ChartButton;