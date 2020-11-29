export const selectItem = itemId => ({
    type: 'SELECT_ITEM',
    itemId
})

export const selectTransaction = transactionId => ({
    type: 'SELECT_TRANSACTION',
    transactionId
})

export const setSelectedMonth = date => ({
    type: 'SET_SELECTED_MONTH',
    date
})

export const loadBudget = data => ({
    type: 'LOAD_BUDGET',
    data
})

export function ignoreTransaction(transactionId) {
    return {
        type: 'IGNORE_TRANSACTION',
        transactionId,
        updateDB: true
    }
}