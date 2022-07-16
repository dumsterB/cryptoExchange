import styles from './tooltip.module.scss';

export function tooltipHandler(context) {
    const {chart, tooltip} = context;
    const node = getTooltipNode(chart);

    const [ content ] = tooltip.title;

    if (!tooltip.opacity) {
        node.style.opacity = 0;

        return;
    }

    if (content) {
        node.innerHTML = content;
    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
  
    node.style.opacity = 1;
    node.style.left = `${ positionX + tooltip.caretX }px`;
    node.style.top = `${ positionY + tooltip.caretY - 36 }px`;
}

function getTooltipNode(chart) {
    let node = chart.canvas.parentNode.querySelector('div');
  
    if (!node) {
        node = document.createElement('div');

        node.classList.add(styles.tooltip);
    
        chart.canvas.parentNode.appendChild(node);
    }
  
    return node;
}