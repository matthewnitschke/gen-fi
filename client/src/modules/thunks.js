import { loadBudget as loadBudgetAction } from './root/root.actions.js';

import { addTransaction } from './transactions/transactions.actions.js';

import { format, parse } from 'date-fns';

const serverUrl = `http://${window.location.host}`;

export const loadBudget = (date) => {
  return (dispatch) => {
    let fmtDate = format(date, 'yyyy/MM');
    fetch(`${serverUrl}/budget/${fmtDate}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data == null) {
          dispatch(
            loadBudgetAction({
              items: {},
              borrows: {},
              transactions: {},
              ignoredTransactionIds: [],
              rootItemIds: [],
            })
          );
        } else {
          dispatch(loadBudgetAction(data));
        }
      });
  };
};

export const saveBudget = (store) => {
  return () => {
    let fmtDate = format(store.selectedMonth, 'yyyy/MM');

    const dataToStore = {
      ignoredTransactionIds: store.ignoredTransactionIds,
      rootItemIds: store.rootItemIds,
      items: store.items,
      borrows: store.borrows,
    };

    console.log(dataToStore);

    fetch(`${serverUrl}/budget/${fmtDate}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToStore),
    });
  };
};

export const resetBudget = (store) => {
  return () => {
    let fmtDate = format(store.selectedMonth, 'yyyy/MM');

    fetch(`${serverUrl}budget/${fmtDate}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  };
};

export const newTransaction = (merchant, amount, dateString) => {
  return (dispatch) => {
    let fmtDate = format(
      parse(dateString, 'MM/dd/yyyy', new Date()),
      'yyyy-MM-dd'
    );

    fetch(`${serverUrl}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchant,
        amount,
        date: fmtDate,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(addTransaction(data));
      });
  };
};

export const logout = () => {
  return () => {
    fetch(`${serverUrl}/login/logout`, {
      method: 'POST',
    }).then(() => window.location.reload());
  };
};
