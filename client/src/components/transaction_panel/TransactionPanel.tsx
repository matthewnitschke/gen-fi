import React from 'react'
import Transaction from './TransactionBadge'
import TransactionList from './TransactionList'
import { useSelector } from 'react-redux';
import { unassignedTransactionsSelectorFactory } from '../../modules/transactions/transactions.selectors';

import 'styles/transaction-panel';
import Button, { ButtonSkin } from '../util/Button';

export default function TransactionPanel() {
    const transactions = useSelector(unassignedTransactionsSelectorFactory());

    return <div className="transaction-panel">
        <TransactionList transactions={transactions} />

        <div>
            <Button skin={ButtonSkin.add} />
        </div>
    </div>
}