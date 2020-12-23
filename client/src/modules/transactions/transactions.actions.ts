import { Transaction } from '../../redux/state';

export const addTransaction = (transaction: Transaction) => ({
  type: 'ADD_TRANSACTION',
  transaction,
});
