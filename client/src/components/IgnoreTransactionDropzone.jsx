import React from 'react';

import { useDrop } from 'react-dnd';

import '../styles/ignore_transaction_dropzone.scss'

export default function IgnoreTransactionDropzone() {

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'transaction',
        drop: () => ({ ignore: true }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return <div ref={drop} className="ignore-transaction-dropzone">
        Ignore
    </div>
}