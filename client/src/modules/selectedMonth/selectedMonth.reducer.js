export function selectedMonthReducer(selectedMonth = new Date(), action) {
    
    switch(action.type) {
        case 'SET_SELECTED_MONTH':
            return action.date
    }

    return selectedMonth;
}