import React from 'react';

import { useDrag } from 'react-dnd';

import { useSelector, useDispatch } from 'react-redux';

import { addTransactionToItem } from '../modules/transactions/transactions.actions.js';

export default function Transaction({
    transactionId,
    amount,
    merchant,
}) {
    const dispatch = useDispatch();

    const [{ isDragging }, drag] = useDrag({
        item: { amount, type: 'transaction' },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                dispatch(addTransactionToItem(transactionId, dropResult.itemId))
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return <div ref={drag} className="transaction">
        <div className="amount">${amount}</div>
        <div className="merchant">{merchant}</div>
    </div>
}