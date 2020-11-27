import { createSelector } from 'reselect';

import { itemsSelector, itemSelectorFactory } from '../items/items.selectors.js';

export const transactionsSelector = state => state.transactions;
export const ignoredTransactionsSelector = state => state.ignoredTransactions;

export const unassignedTransactionsSelectorFactory = () => createSelector(
    itemsSelector,
    ignoredTransactionsSelector,
    transactionsSelector,
    (items, ignoredTransactions, transactions) => {
        return Object.keys(transactions).filter(id => {
            if (ignoredTransactions.includes(id)) return false;

            for (let i = 0; i < Object.keys(items).length; i ++) {
                let item = items[Object.keys(items)[i]];

                if (item.hasOwnProperty('transactions') && item.transactions.includes(id)) {
                    return false;
                }
            }

            return true;
        }).reduce((acc, id) => {
            return ({ ...acc, [id]: transactions[id] });
        }, {});
    }
)

export const assignedTransactionsSelectorFactory = itemId => createSelector(
    transactionsSelector,
    itemSelectorFactory(itemId),
    (transactions, item) => {
        if (!item.hasOwnProperty(transactions)) return {};

        return item.transactions.reduce((acc, id) => ({...acc, [id]: transactions[id]}), {});
    }
)

export const assignedTransactionsSumSelectorFactory = itemId => createSelector(
    assignedTransactionsSelectorFactory(itemId),
    transactions => Object.keys(transactions)
        .reduce((acc, id) => {
            return acc + transactions[id].amount;
        }, 0)
)