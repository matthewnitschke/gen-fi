import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { updaterMiddleware } from './modules/updater_middleware.js';
import { rootReducer } from './modules/root/root.reducer.js';
import { itemsReducer } from './modules/items/items.reducer.js';
import { transactionsReducer } from './modules/transactions/transactions.reducer.js';
import { borrowsReducer } from './modules/borrows/borrows.reducer.js';

import {getFirstOfMonth} from './utils.js';

const defaultState = {
    selectedMonth: getFirstOfMonth(new Date()),

    transactions: {},
    
    ignoredTransactions: [],
    
    // [itemId]: {
    //     label: ''
    //     value: { type: '' },
    //     transactions: ['']
    // }
    items: {},

    borrows: {},

    selectedItemId: null,
    selectedTransactionId: null,
}

const store = createStore(
    (state = defaultState, action) => {
        let rootState = rootReducer(state, action);

        return {
            ...rootState,
            items: itemsReducer(rootState.items, action),
            transactions: transactionsReducer(rootState.transactions, action),
            borrows: borrowsReducer(rootState.borrows, action),
        };
    },

    defaultState,

    composeWithDevTools(
        applyMiddleware(thunk, updaterMiddleware)
    )
);


export default store;