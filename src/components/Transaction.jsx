import React from 'react';

import { useDrag } from 'react-dnd';

export default function Transaction({
    amount,
    merchant,
}) {

    const [{ isDragging }, drag] = useDrag({
        item: { amount, type: 'transaction' },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`);
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