import { createStore, combineReducers, applyMiddleware } from 'redux'
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

    items: {},

    borrows: {},

    selectedItemId: null
}

const store = createStore(
    // combineReducers({
    //     items: itemsReducer,
    //     transactions: transactionsReducer,
    //     borrows: borrowsReducer,

    //     selectedMonth: (month = defaultState.selectedMonth, action) => month,
    //     ignoredTransactions: (data = []) => data,
    //     selectedItemId: (data = null) => data,
    // }),
    (state = defaultState, action) => {
        // let newState = rootReducer(state, action);

        // let newState = combineReducers({
        //     items: itemsReducer,
        //     transactions: transactionsReducer,
        //     borrows: borrowsReducer,
        // })(newState, action);

        let rootState = rootReducer(state, action);

        

        let st = {
            ...rootState,
            items: itemsReducer(rootState.items, action),
            transactions: transactionsReducer(rootState.transactions, action),
            borrows: borrowsReducer(rootState.borrows, action),
        };

        return st;
    },

    // (state = {}, action) => {
    //     state = rootReducer(state, action);

    //     state.items = itemsReducer(state.items, action);
    //     state.transactions = transactionsReducer(state.transactions, action);
    //     state.borrows = borrowsReducer(state.borrows, action);

    //     return state;
    // },

    defaultState,

    composeWithDevTools(
        applyMiddleware(thunk, updaterMiddleware)
    )
);


export default store;