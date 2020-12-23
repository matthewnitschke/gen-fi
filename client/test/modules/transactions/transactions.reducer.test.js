import { transactionsReducer } from '../../../src/modules/transactions/transactions.reducer';
import { addTransaction } from '../../../src/modules/transactions/transactions.actions';

describe('transactions reducer', () => {
  it('should return default state', () => {
    let transactions = transactionsReducer(undefined, {});
    expect(transactions).toEqual({});
  });

  it('should add transaction', () => {
    let newTransactionId = 'someId';
    let newTransactionData = { _id: newTransactionId, amount: 2 };
    let transactions = transactionsReducer(
      {},
      addTransaction(newTransactionData)
    );

    expect(transactions).toEqual({
      [newTransactionId]: newTransactionData,
    });
  });
});
