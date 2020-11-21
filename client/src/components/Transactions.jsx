import React, {useEffect, useRef} from 'react';

import Transaction from './Transaction.jsx';

import { useSelector } from 'react-redux';


import '../styles/transactions.scss';
import { unassignedTransactionsSelectorFactory } from '../modules/transactions/transactions.selectors.js';

export default function Transactions() {

    const unassignedTransactions = useSelector(
        unassignedTransactionsSelectorFactory()
    )

    return <div className="transactions">

        {Object.keys(unassignedTransactions).map(id => {
            let transaction = unassignedTransactions[id];
            return <Transaction key={id} transactionId={id} amount={transaction.amount} merchant={transaction.merchant}/>
        })}
    </div>
}