export function addBorrow(
    toId,
    fromId,
    amount,
) {
    return {
        type: 'ADD_BORROW',
        toId,
        fromId,
        amount,
    }
}