
export function transactionsReducer(transactions = {}, action) {
    switch (action.type) {
        case 'ADD_TRANSACTION_TO_ITEM':
            return {
                ...transactions,
                [action.transactionId]: {
                    ...transactions[action.transactionId],
                    assignedItem: action.itemId,
                }
            }
    }

    return transactions;
}