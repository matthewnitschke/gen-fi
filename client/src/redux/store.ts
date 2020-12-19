import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Action, Store } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';

import { updaterMiddleware } from '../modules/updater_middleware.js';
import { rootReducer } from '../modules/root/root.reducer.js';
import { itemsReducer } from '../modules/items/items.reducer.js';
import { transactionsReducer } from '../modules/transactions/transactions.reducer.js';
import { borrowsReducer } from '../modules/borrows/borrows.reducer.js';

import { AppState } from './state';


export default function configureStore(
    initialState: AppState,
  ): Store<AppState> {

    return createStore<AppState, Action<any>, unknown, unknown>(
        (state = initialState, action) => {
            let rootState = rootReducer(state, action);
    
            return {
                ...rootState,
                items: itemsReducer(rootState.items, action),
                transactions: transactionsReducer(rootState.transactions, action),
                borrows: borrowsReducer(rootState.borrows, action),
            };
        },
        initialState,
        composeWithDevTools(
            applyMiddleware(thunk, updaterMiddleware)
        )
    );

}