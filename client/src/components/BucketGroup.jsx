import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid';

import { addBucket, updateItem } from '../modules/items/items.actions.js';
import {selectItem} from '../modules/root/root.actions.js';

import Bucket from './Bucket.tsx';
import TextInput from './util/TextInput.jsx';

export default function BucketGroup({ itemId }) {
    let dispatch = useDispatch()

    const item = useSelector(state => state.items[itemId])
    const subItems = useSelector(
        state => state.items[itemId].items,
    )

    return <div 
        className="bucket-group"
    >
        <div className="label" onClick={() => {dispatch(selectItem(itemId))}}>
            <TextInput
                value={item.label}
                placeholder='Label'
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