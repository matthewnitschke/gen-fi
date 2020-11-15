import React, {useRef} from 'react';

import Card from './util/Card.jsx';

import '../styles/bucket_details_panel.scss';
import { useSelector, useDispatch } from 'react-redux';

import useOnClickOutside from '../hooks/useClickOnOutside.js';

import {selectBucket} from '../modules/items/items.actions.js'

import {getItem} from '../utils.js';

export default function BucketDetailsPanel(props) {
    const ref = useRef();
    const dispatch = useDispatch();

    const item = useSelector(state => getItem(state, state.selectedItemId))

    useOnClickOutside(ref, () => dispatch(selectBucket(null)))

    return <Card ref={ref} className="bucket-details-panel">
        <div>{item.label}</div>
        <div>${item.amount}</div>
    </Card>
}