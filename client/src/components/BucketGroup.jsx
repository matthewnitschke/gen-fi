import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { createSelector } from 'reselect';

import { addBucket, updateItem, selectItem } from '../modules/items/items.actions.js'

import { itemSelectorFactory } from '../modules/items/items.selectors.js';

import Bucket from './Bucket.jsx';
import TextInput from './util/TextInput.jsx';


export default function BucketGroup({ itemId }) {
    let dispatch = useDispatch()

    const item = useSelector(itemSelectorFactory(itemId))
    const subItems = useSelector(createSelector(
        itemSelectorFactory(itemId),
        item => item.items
    ))

    return <div 
        className="bucket-group"
    >
        <div className="label">
            <TextInput 
                value={item.label} 
                onValueChange={(v) => {
                    return dispatch(updateItem(itemId, {...item, label: v}));
                }}
            />
        </div>
        <div>
            {subItems.map(subItemId => {
                return <Bucket key={subItemId} itemId={subItemId} />
            })}
        </div>
        <div style={{marginTop: '.5rem'}}>
            <a className="link" onClick={() => {
                return dispatch(addBucket(itemId));
            }}>Add Item</a>
        </div>
    </div>
}