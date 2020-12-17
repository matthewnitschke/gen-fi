export function rootReducer(state = {}, action) {

    switch(action.type) {
        case 'SELECT_ITEM':
            return {
                ...state,
                selectedItemId: action.itemId
            }

        case 'SELECT_TRANSACTION':
            return {
                ...state,
                selectedTransactionId: action.transactionId
            }
        
        case 'IGNORE_TRANSACTION':
            return {
                ...state,
                ignoredTransactions: [...state.ignoredTransactions, action.transactionId]
            }

        case 'SET_SELECTED_MONTH':
            return {
                ...state,
                selectedMonth: action.date,
                transactions: {},
                items: {},
                borrows: {}
            }

        case 'LOAD_BUDGET':
            return {
                ...state,
                ...action.data
            };
    }

    return state    
}