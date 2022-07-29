export const createGradientBackground = color => ({ chart: { ctx, chartArea }} = {}) => {
    if (!ctx)
        return 'transparent';

    const gradient = ctx.createLinearGradient(
        0,
        chartArea?.top ?? 0,
        0,
        chartArea?.bottom ?? 200
    );

    gradient.addColorStop(0, `${ color }25`);
    gradient.addColorStop(1, `${ color }00`);
    
    return gradient;
};