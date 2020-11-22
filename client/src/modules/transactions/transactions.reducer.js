
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

        case 'IGNORE_TRANSACTION':
            return Object.keys(transactions)
                .filter(id => id != action.transactionId)
                .reduce((acc, id) => ({...acc, [id]: transactions[id]}), {})

        case 'SET_SELECTED_MONTH':
            return {}
    }

    return transactions;
}