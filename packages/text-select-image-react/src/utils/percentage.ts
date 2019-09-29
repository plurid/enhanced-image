export const valueFromPercentage = (percentage: number, total: number): number => {
    const value = percentage * total / 100;

    return value;
}


export const percentageFromValue = (value: number, total: number): number => {
    const percentage = value * 100 / total;

    return percentage;
}
