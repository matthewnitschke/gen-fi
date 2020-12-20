import React from 'react'

import Transaction from './Transaction.jsx'
import AddTransactionButton from './AddTransactionButton.jsx'

import { useSelector } from 'react-redux'

import '../styles/transactions.scss'
import { unassignedTransactionsSelectorFactory } from '../modules/transactions/transactions.selectors.js'

export default function Transactions() {
    const unassignedTransactions = useSelector(
        unassignedTransactionsSelectorFactory()
    )

    return (
        <div className="transactions">
            <AddTransactionButton />
            {unassignedTransactions.map((transaction) => {
                return (
                    <Transaction
                        key={transaction.id}
                        transactionId={transaction.id}
                    />
                )
            })}
        </div>
    )
}
