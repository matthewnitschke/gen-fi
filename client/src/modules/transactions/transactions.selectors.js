import { createSelector } from 'reselect';

export const transactionsSelector = state => state.transactions;

export const unassignedTransactionsSelectorFactory = () => createSelector(
    transactionsSelector,
    transactions => Object.keys(transactions)
        .filter(id => {
            return transactions[id].assignedItem == null;
        })
        .reduce((acc, id) => {
            return {
                ...acc,
                [id]: transactions[id],
            }
        }, {})
)

export const assignedTransactionsSelectorFactory = itemId => createSelector(
    transactionsSelector,
    transactions => Object.keys(transactions)
        .filter(transactionId => {
            return transactions[transactionId].assignedItem == itemId;
        })
        .reduce((acc, id) => ({...acc, [id]: transactions[id]}), {})
)

export const assignedTransactionsSumSelectorFactory = itemId => createSelector(
    assignedTransactionsSelectorFactory(itemId),
    transactions => Object.keys(transactions)
        .reduce((acc, id) => {
            return acc + transactions[id].amount;
        }, 0)
)