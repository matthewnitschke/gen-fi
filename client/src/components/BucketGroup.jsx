import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { addBucket, updateItem, selectItem } from '../modules/items/items.actions.js'

import { flatItemsSelector } from '../selectors.js';

import Bucket from './Bucket.jsx';
import TextInput from './util/TextInput.jsx';


export default function BucketGroup(props) {
    let dispatch = useDispatch()

    const item = useSelector(
        state => flatItemsSelector(state)[props.itemId],
    )

    return <div 
        className="bucket-group"
    >
        <div className="label">
            <TextInput 
                value={item.label} 
                onValueChange={(v) => {
                    return dispatch(updateItem(props.itemId, v, item.amount));
                }}
            />
        </div>
        <div>
            {item.items.map(({ id: subItemId }) => {
                return <Bucket key={subItemId} itemId={subItemId} />
            })}
        </div>
        <div style={{marginTop: '.5rem'}}>
            <a className="link" onClick={() => {
                return dispatch(addBucket(props.itemId));
            }}>Add Item</a>
        </div>
    </div>
}