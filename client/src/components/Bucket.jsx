import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { useDrop } from 'react-dnd';

import { updateItem } from '../modules/items/items.actions.js';
import { selectItem } from '../modules/root/root.actions.js';

import { itemSelectorFactory, itemValueSelectorFactory } from '../modules/items/items.selectors.js';
import { assignedTransactionsSumSelectorFactory } from '../modules/transactions/transactions.selectors.js';

import TextInput from './util/TextInput';
import '../styles/bucket.scss';
import ProgressIndicator from './util/ProgressIndicator.jsx';

export default function Bucket({ itemId }) {
    const dispatch = useDispatch()
    
    const item = useSelector(
        itemSelectorFactory(itemId),
        shallowEqual
    )

    const transactionSum = useSelector(
        assignedTransactionsSumSelectorFactory(itemId),
        shallowEqual
    )

    const itemValueSum = useSelector(
        itemValueSelectorFactory(itemId)
    )

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'transaction',
        drop: () => ({ itemId: itemId }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return <div 
        ref={drop}
        className={`bucket ${isOver ? 'transaction-hovered' : ''}`}
        onClick={() => dispatch(selectItem(itemId))}
    >
        <div className="label">
            <TextInput
                value={item.label} 
                onValueChange={(v) => dispatch(updateItem(itemId, { ...item, label: v }))}
            />
        </div>
        <div className="max-amount">${itemValueSum}</div>

        <div className="amount-slider">
            <ProgressIndicator value={transactionSum} max={itemValueSum}/>
        </div>

    </div>
}