import React from 'react';
import { connect } from 'react-redux';

import Bucket from './Bucket.jsx';

import {addBucket} from '../modules/items/items.actions.js'
import { itemSelector } from '../modules/items/items.selectors.js'

import TextInput from './util/TextInput.jsx';

import { getItem } from '../utils.js';

import { useDispatch, useSelector } from 'react-redux'

export default function BucketGroup(props) {
    let dispatch = useDispatch()

    const item = useSelector(
        state => getItem(state, props.itemId),
        item => item.items.length
    )

    return <div className="bucket-group">
        <div className="label">
            <TextInput value={item.label} />
        </div>
        <div>
            {Object.keys(item.items).map((subItemId) => {
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