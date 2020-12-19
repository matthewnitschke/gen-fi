import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, updateItem} from '../../modules/items/items.actions.js'
import { selectItem } from '../../modules/root/root.actions.js'

import { itemValueSelectorFactory } from '../../modules/items/items.selectors.js';
import { assignedTransactionsSumSelectorFactory } from '../../modules/transactions/transactions.selectors.js';

import ProgressIndicator from '../util/ProgressIndicator.jsx';

export default function BucketDetailsHeader({ itemId }) {
    const dispatch = useDispatch();

    const item = useSelector(state => state.items[itemId]);
    const itemAmount = useSelector(itemValueSelectorFactory(itemId))
    const transactionSumAmount = useSelector(assignedTransactionsSumSelectorFactory(itemId))

    return <>
        <div className="header-icons">
            <i 
                className="far fa-trash-alt delete-button"
                onClick={() => {
                    dispatch(selectItem(null));
                    dispatch(deleteItem(itemId));
                }}
            ></i>
            <i 
                className="fas fa-times close-button"
                onClick={() => dispatch(selectItem(null))}
            ></i>
        </div>
        
        <div className="header">
            <div className="label">{item.label}</div>
            <div className="amount">${itemAmount}</div>
        </div>
        
        <ProgressIndicator value={transactionSumAmount} max={itemAmount}/>
    </>
}