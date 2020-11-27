import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import { rootReducer } from './modules/root/root.reducer.js';
import { itemsReducer } from './modules/items/items.reducer.js';
import { transactionsReducer } from './modules/transactions/transactions.reducer.js';
import { borrowsReducer } from './modules/borrows/borrows.reducer.js';

import {getFirstOfMonth} from './utils.js';

const defaultState = {
    selectedMonth: getFirstOfMonth(new Date()),

    transactions: {},

    ignoredTransactions: [],

    items: {},
    
    borrows: {},

    selectedItemId: null
}

const store = createStore(
    (state = {}, action) => {
        return {
            ...rootReducer(state, action),

            items: itemsReducer(state.items, action),
            transactions: transactionsReducer(state.transactions, action),
            borrows: borrowsReducer(state.borrows, action)
        }
    },

    defaultState,

    applyMiddleware(thunk)
);


export default store;