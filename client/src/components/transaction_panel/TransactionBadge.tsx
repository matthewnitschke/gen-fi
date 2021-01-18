import React from 'react'
import { useDrag } from 'react-dnd';
import 'styles/transaction-badge.scss';
import { Transaction } from '../../redux/state';

export interface TransactionBadgeProps {
    transaction: Transaction
}

export default function TransactionBadge(props: TransactionBadgeProps) {
    const [{ isDragging }, drag] = useDrag({
        item: { transaction: props.transaction,  type: 'transaction' },
        end: (item, monitor) => {
            // const dropResult = monitor.getDropResult();
            // if (item && dropResult) {
            //     if (dropResult.ignore) {
            //         dispatch(ignoreTransaction(transactionId));
            //     } else {
            //         dispatch(addTransactionToItem(dropResult.itemId, transactionId));
            //     }
            // }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return <div
        ref={drag}
        className={`transaction-badge ${props.transaction.amount > 0 ? 'income' : 'expense'}`}
    >
        <div className='amount'>
            ${Math.abs(props.transaction.amount)}
        </div>
        <div className='merchant'>
            {props.transaction.merchant}
        </div>
    </div>
}