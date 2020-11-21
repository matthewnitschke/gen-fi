export function addTransactionToItem(transactionId, itemId) {
    return {
        type: 'ADD_TRANSACTION_TO_ITEM',
        transactionId,
        itemId
    }
}