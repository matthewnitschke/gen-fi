export function rootReducer(state = {}, action) {

    switch(action.type) {
        case 'SELECT_ITEM':
            return {
                ...state,
                selectedItemId: action.itemId
            }

        case 'SET_SELECTED_MONTH':
            return {
                ...state,
                selectedMonth: action.date
            }

        case 'LOAD_BUDGET': 
            return {
                ...state,
                ...action.data
            };
    }

    return state    
}