import React from 'react'
import { useSelector } from 'react-redux';
import { itemBorrowsSelectorFactory } from '../../modules/borrows/borrows.selectors';
import { AppState } from '../../redux/state';

export default function ItemBorrows({ itemId }) {
    const items = useSelector((state: AppState) => state.items);
    const itemBorrows = useSelector(itemBorrowsSelectorFactory(itemId))

    return <>
        <h2>Borrows</h2>

        <h4>From</h4>
        {itemBorrows.from.map((borrow, i) => 
            <div key={i}>{items[borrow.toId].label}: ${borrow.amount}</div>
        )}

        <h4>To</h4>
        {itemBorrows.to.map((borrow, i) => 
            <div key={i}>{items[borrow.fromId].label}: -${borrow.amount}</div>
        )}

        <input type="button" value="Borrow"/>
    </>;
}