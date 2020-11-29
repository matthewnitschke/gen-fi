import { loadBudget as loadBudgetAction } from './root/root.actions.js'

import { format, parse } from 'date-fns';

export const loadBudget = date => {
    return (dispatch) => {
        let fmtDate = format(date, 'yyyy/MM');
        fetch(`http://localhost/budget/${fmtDate}`)
            .then(resp => resp.json())
            .then(data => {
                if (data == null) {
                    dispatch(loadBudgetAction({
                        items: {}, 
                        borrows: {},
                        ignoredTransactions: [],
                        transactions: {},
                    }))
                } else {
                    dispatch(loadBudgetAction(data))
                }
            });
    }
  }

export const saveBudget = store => {
    return () => {
        let fmtDate = format(store.selectedMonth, 'yyyy/MM');

        const dataToStore = {
            ignoredTransactions: store.ignoredTransactions,
            items: store.items,
            borrows: store.borrows,
        }

        console.log(dataToStore);

        fetch(
            `http://localhost/budget/${fmtDate}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToStore)
        })
    }
}

export const newTransaction = (merchant, amount, dateString) => {
    return (dispatch) => {
        let fmtDate = format(
            parse(dateString, 'MM/dd/yyyy', new Date()),
            'yyyy-MM-dd'
        )

        fetch(
            `http://localhost/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                merchant,
                amount,
                date: fmtDate
            })
        })
            .then(resp => resp.json())
            .then((data) => {
                dispatch({
                    type: 'ADD_TRANSACTION',
                    transaction: data,
                })
            })

    }
}