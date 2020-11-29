import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { addBucket, updateItem } from '../modules/items/items.actions.js';
import {selectItem} from '../modules/root/root.actions.js';

import Bucket from './Bucket.jsx';
import DeleteItemButton from './DeleteItemButton.jsx';
import TextInput from './util/TextInput.jsx';


export default function BucketGroup({ itemId }) {
    let dispatch = useDispatch()

    const selectedItemId = useSelector(state => state.selectedItemId)

    const item = useSelector(state => state.items[itemId])
    const subItems = useSelector(
        state => state.items[itemId].items,
    )

    return <div 
        className="bucket-group"
    >
        {selectedItemId == itemId && <DeleteItemButton itemId={itemId}/>}
        <div className="label">
            <TextInput
                onFocus={() => dispatch(selectItem(itemId))}
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