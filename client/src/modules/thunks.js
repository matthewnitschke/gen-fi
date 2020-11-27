import { loadBudget as loadBudgetAction } from './root/root.actions.js'

import { format } from 'date-fns';

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

export const saveBudget = (date, storeData) => {
    return (dispatch) => {
        let fmtDate = format(date, 'yyyy/MM');
        fetch(
            `http://localhost/budget/${fmtDate}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(storeData)
        })
    }
}