import { createStore, combineReducers } from 'redux'

import { itemsReducer } from './modules/items/items.reducer.js';
import { selectedItemReducer } from './modules/selectedItem/selectedItem.reducer.js';
import { transactionsReducer } from './modules/transactions/transactions.reducer.js';
import { borrowsReducer } from './modules/borrows/borrows.reducer.js';
import { selectedMonthReducer } from './modules/selectedMonth/selectedMonth.reducer.js';

import {getFirstOfMonth} from './utils.js';

const defaultState = {

    selectedMonth: getFirstOfMonth(new Date()),

    transactions: {
        'a': {
            merchant: 'Amazon',
            amount: 120,
            assignedItem: 'other'
        },
        'b': {
            merchant: 'Costco',
            amount: 120,
        },
        'c': {
            merchant: 'Costco',
            amount: 120,
            isIgnored: true
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
    
    borrows: {
        'z': {
            fromId: 'groceries-1',
            toId: 'other',
            amount: 50
        }
    },

    selectedItemId: null
}

const store = createStore(
    combineReducers({
        items: itemsReducer,
        selectedItemId: selectedItemReducer,
        transactions: transactionsReducer,
        borrows: borrowsReducer,
        selectedMonth: selectedMonthReducer,
    }),

    defaultState
);


export default store;