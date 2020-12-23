import React, { useRef } from 'react';

import { useSelector } from 'react-redux';

import Card from './util/Card';
import { AppState } from '../redux/state';

export default function TransactionDetailsPanel({ transactionId }) {
  const transaction = useSelector(
    (state: AppState) => state.transactions[transactionId]
  );

  return (
    <Card>
      <h1>{transaction.merchant}</h1>
      <div>Amount: ${transaction.amount}</div>
      <div>Date: {transaction.date}</div>
    </Card>
  );
}
