import { createStore, combineReducers } from 'redux'

import { items } from './modules/items/items.reducer.js';

const defaultState = {
    items: [
        { label: 'Groceries', type: 'group' },
        { label: 'Adulting', amount: 100}
    ]
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