import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import { Provider } from 'react-redux';

import configureStore from './redux/store.ts';

import {getFirstOfMonth} from './utils';

let store = configureStore({
    selectedMonth: getFirstOfMonth(new Date()),

    items: {},
    transactions: {},
    borrows: {},
    
    ignoredTransactions: [],
    selectedItemId: null,
    selectedTransactionId: null,
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);