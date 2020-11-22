export function addTransactionToItem(transactionId, itemId) {
    return {
        type: 'ADD_TRANSACTION_TO_ITEM',
        transactionId,
        itemId
    }
}

export function ignoreTransaction(transactionId) {
    return {
        type: 'IGNORE_TRANSACTION',
        transactionId,
    }
}