import React from 'react';

import {selectItem} from '../modules/root/root.actions.js'
import {deleteItem} from '../modules/items/items.actions.js'

import {useDispatch} from 'react-redux';

export default function DeleteItemButton({itemId}) {

    const dispatch = useDispatch()
    
    return <div 
        className="delete-item-button"
        onClick={() => {
            dispatch(selectItem(null));
            dispatch(deleteItem(itemId));
        }}
    >
        <i className="far fa-trash-alt"></i>
    </div>
}