import React, {useRef} from 'react';

import Card from './util/Card.jsx';

import '../styles/bucket_details_panel.scss';
import { useSelector, useDispatch } from 'react-redux';

import useOnClickOutside from '../hooks/useClickOnOutside.js';

import {selectItem, deleteItem} from '../modules/items/items.actions.js'

import { flatItemsSelector } from '../selectors.js';
import ProgressIndicator from './util/ProgressIndicator.jsx';

export default function BucketDetailsPanel(props) {
    const ref = useRef();
    const dispatch = useDispatch();

    const item = useSelector(
        state => flatItemsSelector(state)[props.itemId],
    )

    useOnClickOutside(ref, () => dispatch(selectItem(null)))

    return <Card ref={ref} className="details-panel">
        <div className="header">
            <div>{item.label}</div>
            <div>${item.amount}</div>
            <input type="button" value="Delete" onClick={() => dispatch(deleteItem(props.itemId))} />
        </div>
        <div>
            <ProgressIndicator value={item.amount} max={item.maxAmount}/>
        </div>
    </Card>
}