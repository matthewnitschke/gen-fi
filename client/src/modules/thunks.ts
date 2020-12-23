import { loadBudget as loadBudgetAction } from './root/root.actions';

import { addTransaction } from './transactions/transactions.actions';

import { format, parse } from 'date-fns';
import { AppState } from '../redux/state';
import { Action, ThunkAction } from '@reduxjs/toolkit';

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

export const saveBudget = (
  state: AppState
): ThunkAction<void, AppState, undefined, Action> => {
  return (): void => {
    let fmtDate = format(state.selectedMonth, 'yyyy/MM');

    const dataToStore = {
      ignoredTransactionIds: state.ignoredTransactionIds,
      rootItemIds: state.rootItemIds,
      items: state.items,
      borrows: state.borrows,
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

export const resetBudget = (store: AppState) => {
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

export const newTransaction = (
  merchant: string,
  amount: string,
  dateString: string
) => {
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
