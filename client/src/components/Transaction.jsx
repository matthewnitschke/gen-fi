import React from 'react';

import { useDrag } from 'react-dnd';

import { useSelector, useDispatch } from 'react-redux';

import { addTransactionToItem, ignoreTransaction } from '../modules/transactions/transactions.actions.js';

import IgnoreTransactionDropzone from './IgnoreTransactionDropzone.jsx';

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
                if (dropResult.ignore) {
                    dispatch(ignoreTransaction(transactionId))
                } else {
                    dispatch(addTransactionToItem(transactionId, dropResult.itemId))
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return <>
        {isDragging &&
            <IgnoreTransactionDropzone />
        }

        <div ref={drag} style={{visibility: isDragging ? 'hidden' : 'initial'}} className="transaction">
            <div className="amount">${amount}</div>
            <div className="merchant">{merchant}</div>
        </div>
    </>
}