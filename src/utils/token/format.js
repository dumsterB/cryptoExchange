export function formatTokenQuantity(value, decimals = 16) {
    return parseFloat(
        value?.toFixed(value > 1
            ? 3
            : decimals
        ) ?? 0
    );
}