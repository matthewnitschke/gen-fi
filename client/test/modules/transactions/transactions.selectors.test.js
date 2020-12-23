import {
  unassignedTransactionsSelectorFactory,
  assignedTransactionsSelectorFactory,
  assignedTransactionsSumSelectorFactory,
} from '../../../src/modules/transactions/transactions.selectors';

describe('transactions selectors', () => {
  it('should return all unassigned transactions', () => {
    let state = {
      items: {
        i_a: { transactions: ['t_a', 't_b'] },
        i_b: {},
        i_c: { transactions: ['t_c'] },
      },
      ignoredTransactionIds: ['t_d', 't_e'],
      transactions: {
        t_a: {},
        t_b: {},
        t_c: {},
        t_d: {},
        t_e: {},
        t_f: {},
      },
    };

    let unassignedTransaction = unassignedTransactionsSelectorFactory()(state);

    // object goes through objToListConverter, and the actual value is empty
    // this is why the value is only { id: 't_f' }
    expect(unassignedTransaction).toEqual([{ id: 't_f' }]);
  });

  it('should return assigned transactions', () => {
    let itemKey = 'i_a';
    let state = {
      items: {
        [itemKey]: { transactions: ['t_a', 't_c'] },
        i_b: {},
        i_c: { transactions: ['t_b'] },
      },
      transactions: {
        t_a: {},
        t_b: {},
        t_c: {},
        t_d: {},
      },
    };

    let assignedTransactions = assignedTransactionsSelectorFactory(itemKey)(
      state
    );

    expect(Object.keys(assignedTransactions)).toEqual(['t_a', 't_c']);
  });

  it('should return the sum of assigned transactions', () => {
    let itemKey = 'i_a';
    let state = {
      items: {
        [itemKey]: { transactions: ['t_a', 't_b'] },
      },
      transactions: {
        t_a: { amount: 1 },
        t_b: { amount: 2 },
      },
    };

    let assignedTransactionsSum = assignedTransactionsSumSelectorFactory(
      itemKey
    )(state);

    expect(assignedTransactionsSum).toEqual(3);
  });
});
