export const computeScaleValue = (
    value: number,
) => {
    if (value === -100) {
        return 0.01;
    }

    return (value / 100) + 1;
}
