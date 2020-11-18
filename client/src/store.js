import { createStore, combineReducers } from 'redux'
import { createSelector } from 'reselect';

import { items } from './modules/items/items.reducer.js';

const defaultState = {
    items: [
        {
            id: 'a',
            label: 'Groceries',
            items: [{
                id: 'c',
                label: 'Week 1',
                amount: 40,
                maxAmount: 100
            }]
        },
        {
            id: 'b',
            label: 'Adulting',
            amount: 0,
            maxAmount: 1000
        }
    ],

    selectedItemId: null
}

const store = createStore(
    items,
    // combineReducers({ 
        // transactions,
        // settings, 
        // items
    // }),

    defaultState
);


export default store;