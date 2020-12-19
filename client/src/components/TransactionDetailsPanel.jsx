import React, {useRef} from 'react';

import {useSelector} from 'react-redux';

import Card from './util/Card';

export default function TransactionDetailsPanel({
    transactionId
}) {
    const cardRef = useRef()

    const transaction = useSelector(
        state => state.transactions[transactionId]
    )

    return <Card ref={cardRef}>
        <h1>{transaction.merchant}</h1>
        <div>Amount: ${transaction.amount}</div>
        <div>Date: {transaction.date}</div>
    </Card>
}