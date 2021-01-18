import React from 'react';
import { useSelector } from 'react-redux';
import { assignedTransactionsSelectorFactory } from '../../modules/transactions/transactions.selectors';

interface ItemTransactionsProps {
  itemId: string
}

export default function ItemTransactions({ itemId }: ItemTransactionsProps) {
  const itemTransactions = useSelector(
    assignedTransactionsSelectorFactory(itemId)
  );

  return (
    <>
      <h2>Transactions</h2>
      {Object.keys(itemTransactions).map((id) => {
        let transaction = itemTransactions[id];
        return (
          <div key={id}>
            {transaction.merchant} - {transaction.amount}
          </div>
        );
      })}
    </>
  );
}
