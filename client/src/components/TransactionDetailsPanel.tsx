import React, { useRef } from 'react';

import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import Card from './util/Card';
import { AppState } from '../redux/state';
import PanelHeaderToolbar from './util/PanelHeaderToolbar';

export default function TransactionDetailsPanel({ transactionId }) {
  const transaction = useSelector(
    (state: AppState) => state.transactions[transactionId]
  );

  return (
    <Card>
       <PanelHeaderToolbar
          onClose={() => {
            // dispatch(selectItem(null));
          }}
        />
      <h1>
        {transaction.merchant ?? '<unknown>'}
      </h1>
      <div>Amount: ${transaction.amount}</div>
      <div>Date: {format(new Date(transaction.date), 'MMM do Y')}</div>
    </Card>
  );
}
