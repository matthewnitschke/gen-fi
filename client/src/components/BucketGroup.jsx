import React from 'react';

import Bucket from './Bucket.jsx';

import { addBucket, updateItem } from '../modules/items/items.actions.js'

import TextInput from './util/TextInput.jsx';


import { useDispatch, useSelector } from 'react-redux'

export default function BucketGroup(props) {
    let dispatch = useDispatch()

    const item = useSelector(state => state.items[props.itemId])
    const childrenItems = useSelector(state => {
        return state.itemsOrder.find(item => item.itemId == props.itemId).items;
    })

    return <div className="bucket-group">
        <div className="label">
            <TextInput 
                value={item.label} 
                onValueChange={(v) => {
                    console.log(`:: ${v}`)
                    return dispatch(updateItem(props.itemId, v, item.amount));
                }}
            />
        </div>
        <div>
            {childrenItems.map((subItemId) => {
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