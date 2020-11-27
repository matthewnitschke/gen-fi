export const selectItem = itemId => ({
    type: 'SELECT_ITEM',
    itemId
})

export const setSelectedMonth = date => ({
    type: 'SET_SELECTED_MONTH',
    date
})

export const loadBudget = data => ({
    type: 'LOAD_BUDGET',
    data
})