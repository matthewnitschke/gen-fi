import React from 'react';

import { useDrop } from 'react-dnd';

import {evaluateString} from '../utils.js';

import '../styles/bucket.scss';

export default function Bucket({
    label,
    amount
}) {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'transaction',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    return <div 
        ref={drop} 
        className={`bucket ${isOver ? 'transaction-hovered' : ''}`}
    >
        <div>{evaluateString(label)}</div>
        <div>${amount}</div>
    </div>
}