import React from 'react'

import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'

import { ignoreTransaction } from '../modules/root/root.actions.js'
import { addTransactionToItem } from '../modules/items/items.actions.js'

import { selectTransaction } from '../modules/root/root.actions.js'

import IgnoreTransactionDropzone from './IgnoreTransactionDropzone.jsx'

export default function Transaction({ transactionId }) {
    const dispatch = useDispatch()

    const transaction = useSelector(
        (state) => state.transactions[transactionId]
    )

    const [{ isDragging }, drag] = useDrag({
        item: { amount: transaction.amount, type: 'transaction' },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                if (dropResult.ignore) {
                    dispatch(ignoreTransaction(transactionId))
                } else {
                    dispatch(
                        addTransactionToItem(dropResult.itemId, transactionId)
                    )
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <>
            {isDragging && <IgnoreTransactionDropzone />}

            <div
                ref={drag}
                style={{ visibility: isDragging ? 'hidden' : 'initial' }}
                className="transaction"
                onClick={() => dispatch(selectTransaction(transactionId))}
            >
                <div className="amount">${transaction.amount}</div>
                <div className="merchant">{transaction.merchant}</div>
            </div>
        </>
    )
}
