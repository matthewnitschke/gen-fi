import { createSelector } from 'reselect';

import { objToListConverter } from '../../utils';

export const unassignedTransactionsSelectorFactory = () =>
  createSelector(
    (state) => objToListConverter(state.items),
    (state) => state.ignoredTransactionIds,
    (state) => objToListConverter(state.transactions),
    (items, ignoredTransactionIds, transactions) => {
      return transactions.filter((transaction) => {
        if (ignoredTransactionIds.includes(transaction.id)) return false;

        for (let i = 0; i < items.length; i++) {
          let item = items[i];

          if (item.transactions && item.transactions.includes(transaction.id)) {
            return false;
          }
        }

        return true;
      });
    }
  );

export const assignedTransactionsSelectorFactory = (itemId) =>
  createSelector(
    (state) => state.transactions,
    (state) => state.items[itemId],
    (transactions, item) => {
      if (!item || !item.transactions) return {};

      return item.transactions.reduce(
        (acc, id) => ({ ...acc, [id]: transactions[id] }),
        {}
      );
    }
  );

export const assignedTransactionsSumSelectorFactory = (itemId) =>
  createSelector(assignedTransactionsSelectorFactory(itemId), (transactions) =>
    Object.keys(transactions).reduce((acc, id) => {
      return acc + transactions[id].amount;
    }, 0)
  );
