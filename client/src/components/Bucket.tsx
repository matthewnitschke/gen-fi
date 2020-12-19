import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { useDrop } from 'react-dnd';

import { updateItem } from '../modules/items/items.actions.js';
import { selectItem } from '../modules/root/root.actions.js';

import { itemValueSelectorFactory } from '../modules/items/items.selectors.js';
import { assignedTransactionsSumSelectorFactory } from '../modules/transactions/transactions.selectors.js';

import TextInput from './util/TextInput';
import '../styles/bucket.scss';
import ProgressIndicator from './util/ProgressIndicator.jsx';
import { AppState } from '../redux/state';

export default function Bucket({ itemId }) {
    const dispatch = useDispatch()
    
    const item = useSelector(
        (state: AppState) => state.items[itemId],
        shallowEqual
    )

    const selectedItemId = useSelector((state: AppState) => state.selectedItemId)

    const transactionSum = useSelector(
        assignedTransactionsSumSelectorFactory(itemId),
        shallowEqual
    )

    const itemValueSum = useSelector(
        itemValueSelectorFactory(itemId)
    )

    const [{ isOver }, drop] = useDrop({
        accept: 'transaction',
        drop: () => ({ itemId: itemId }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    if (item == null) return null;

    return <div
        ref={drop}
        className={`bucket ${isOver ? 'transaction-hovered' : ''}`}
        onClick={() => dispatch(selectItem(itemId))}
    >
        <div className="label">
            <TextInput
                value={item.label} 
                placeholder='Label'
                onValueChange={(v) => dispatch(updateItem(itemId, { ...item, label: v }))}
            />
        </div>
        <div className="max-amount">${itemValueSum}</div>

        <div className="amount-slider">
            <ProgressIndicator value={transactionSum} max={itemValueSum}/>
        </div>

    </div>
}