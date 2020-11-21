import { createStore, combineReducers } from 'redux'

import { itemsReducer } from './modules/items/items.reducer.js';
import { selectedItemReducer } from './modules/selectedItem/selectedItem.reducer.js';
import { transactionsReducer } from './modules/transactions/transactions.reducer.js';

const defaultState = {

    transactions: {
        'a': {
            merchant: 'Amazon',
            amount: 120,
            assignedItem: 'other'
        },
        'b': {
            merchant: 'Costco',
            amount: 120,
        }
    },

    items: {
        'income-group': {
            label: 'Income',
            items: ['income-1', 'income-2']
        },
        'income-1': {
            label: 'Main Income',
            amount: 3000,
            value: { type: 'income', amount: 5000 }
        },
        'income-2': {
            label: 'Sub Income',
            amount: 300,
            value: { type: 'income', amount: 300 }
        },
        'groceries-group': {
            label: 'Groceries',
            items: ['groceries-1']
        },
        'groceries-1': {
            label: 'Week 1',
            value: { type: 'static', amount: 150 }
        },
        'other': {
            label: 'Other',
            value: { type: 'static', amount: 150 }
        },
        'adulting': {
            label: 'Adulting',
            value: { type: 'table', rows: [{ name: 'Spotify', amount: 8 }]}
        },
        'surplus': {
            label: 'surplus',
            value: { type: 'extra' }
        }
    },
    // items: [
    //     {
    //         id: 'a',
    //         label: 'Groceries',
    //         items: [{
    //             id: 'c',
    //             label: 'Week 1',
    //             amount: 40,
    //             maxAmount: 100,
    //             value: { type: 'static' }
    //         }]
    //     },
    //     {
    //         id: 'b',
    //         label: 'Adulting',
    //         amount: 0,
    //         maxAmount: 1000,
    //         value: { type: 'table', rows: [{name: 'Spotify', amount: 8}] }
    //     }
    // ],

    selectedItemId: null
}

const store = createStore(
    combineReducers({ 
        items: itemsReducer,
        selectedItemId: selectedItemReducer,
        transactions: transactionsReducer,
    }),

    defaultState
);


export default store;