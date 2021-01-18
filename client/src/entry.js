import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import {add} from 'date-fns';

import { Provider } from 'react-redux';

import configureStore from './redux/store.ts';

import { getFirstOfMonth } from './utils';

let store = configureStore({
  items: {
    'a': { value: { type: 'static', maxAmount: 3 }, label: 'Foo'}
  },
  transactions: {
    'f': { amount: 2, merchant: 'apple', date: new Date() },
    'g': { amount: -99, merchant: 'Something', date: new Date() },
    'h': { amount: -12345, merchant: 'BestBytes', date: add(new Date(), {days: 3}) },
    'z': { amount: -12345, merchant: 'BestBytes', date: add(new Date(), {days: 3}) },
  },
  borrows: {},

  rootItemIds: [],
  ignoredTransactionIds: [],

  selectedMonth: getFirstOfMonth(new Date()),
  selectedItemId: null,
  selectedTransactionId: null,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
