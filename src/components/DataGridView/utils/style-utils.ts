export function getDimensionValue(value: string | number) {
    if (typeof value === 'number') return `${value}px`;
    if (typeof value === 'string') {
        if (value === 'auto') return '100%';
        if (value.endsWith('%') || value.endsWith('px')) return value;
        return `${value}px`;
    }
    return '';
}