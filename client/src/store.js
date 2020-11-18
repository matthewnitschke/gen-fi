import { createStore, combineReducers } from 'redux'
import { createSelector } from 'reselect';

import { items } from './modules/items/items.reducer.js';

const defaultState = {
    items: {
        'a': { label: 'Groceries' },
        'b': { label: 'Week 1', amount: 100 },
        'c': { label: 'Adulting', amount: 100 }
    },

    itemsOrder: [
        { itemId: 'a', items: ['b']},
        { itemId: 'c' }
    ],

    // items: {
    //     'a': { label: 'Groceries', items: { 'c': { label: 'Week 1', amount: 100 }}},
    //     'b': { label: 'Adulting', amount: 100 }
    // },

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