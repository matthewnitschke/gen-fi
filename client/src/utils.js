export function getFirstOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}