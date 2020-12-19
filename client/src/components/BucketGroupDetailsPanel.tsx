import React from 'react'

import Card from './util/Card';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/state';
import { selectItem } from '../modules/root/root.actions';
import { deleteItem } from '../modules/items/items.actions';

export default function BucketGroupDetailsPanel({ itemId }) {
    const dispatch = useDispatch();
    const groupItem = useSelector((state: AppState) => state.items[itemId]);


    return <Card>
        <h2>{groupItem.label}</h2>

        <input 
            type="button" 
            value="Delete" 
            onClick={() => {
                dispatch(selectItem(null))
                dispatch(deleteItem(itemId))
            }}/>
    </Card>
}