import React from 'react';

import TransactionComponent from './Transaction';
import AddTransactionButton from './AddTransactionButton';

import { useSelector } from 'react-redux';

import '../styles/transactions.scss';
import { unassignedTransactionsSelectorFactory } from '../modules/transactions/transactions.selectors';
import { AppState, Transaction } from '../redux/state';

export default function Transactions() {
  const unassignedTransactions = useSelector<AppState, Array<Transaction>>(
    unassignedTransactionsSelectorFactory()
  );

  return (
    <div className="transactions">
      <AddTransactionButton />
      {unassignedTransactions.map((transaction) => {
        return (
          <TransactionComponent
            key={transaction.id}
            transactionId={transaction.id}
          />
        );
      })}
    </div>
  );
}
