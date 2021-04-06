export const resolveColor = (
    value: string,
) => {
    switch (value) {
        case 'black':
            return '~000';
        case 'white':
            return '~fff';
        case 'red':
            return '~f00';
        default:
            return value;
    }
}
