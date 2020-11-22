import React, {useRef, useState} from 'react';

import Card from './util/Card.jsx';

import '../styles/bucket_details_panel.scss';
import { useSelector, useDispatch } from 'react-redux';

import useOnClickOutside from '../hooks/useClickOnOutside.js';

import { deleteItem, updateItem} from '../modules/items/items.actions.js'
import { selectItem } from '../modules/selectedItem/selectedItem.actions.js'

import ProgressIndicator from './util/ProgressIndicator.jsx';
import InputTable from './util/InputTable.jsx';
import { itemsSelector, itemSelectorFactory } from '../modules/items/items.selectors.js';
import { assignedTransactionsSelectorFactory } from '../modules/transactions/transactions.selectors.js';
import { itemBorrowsSelectorFactory } from '../modules/borrows/borrows.selectors.js';
import Tabs from './util/Tabs.jsx';

export default function BucketDetailsPanel({ itemId }) {
    const ref = useRef();
    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = useState("Details");

    const items = useSelector(itemsSelector);

    const item = useSelector(itemSelectorFactory(itemId));
    const itemTransactions = useSelector(assignedTransactionsSelectorFactory(itemId));
    
    const itemBorrows = useSelector(itemBorrowsSelectorFactory(itemId));

    useOnClickOutside(ref, () => dispatch(selectItem(null)))
    
    function onValueTypeChange(e) {
        dispatch(updateItem(itemId, {
            ...item,
            value: {...item.value, type: e.target.value}
        }))
    }

    return <Card ref={ref} className="details-panel">
        <div className="header">
            <div>{item.label}</div>
            <div>${item.amount}</div>
        </div>
        <div>
            <ProgressIndicator value={item.amount} max={item.maxAmount}/>
        </div>
        <input type="button" value="Delete" onClick={() => dispatch(deleteItem(itemId))} />

        <Tabs items={["Details", "Settings"]} selectedItem={selectedTab} onSelectItem={setSelectedTab} />

        {
            selectedTab == "Details" && 
            <div>
                <h2>Transactions</h2>
                {Object.keys(itemTransactions).map(id => {
                    let transaction = itemTransactions[id];
                    return <div key={id}>{transaction.merchant} - {transaction.amount}</div>
                })}

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

            </div>
        }

        {
            selectedTab == "Settings" && 
            <>
                <div>
                    <h2>Type</h2>
                    <div>
                        <input type="radio" name="value-type" value="income" onChange={onValueTypeChange} checked={item.value.type == 'income'} />
                        <label>Income</label>
                    </div>
                    <div>
                        <input type="radio" name="value-type" value="static" onChange={onValueTypeChange} checked={item.value.type == 'static'} />
                        <label>Value</label>
                    </div>
                    <div>
                        <input type="radio" name="value-type" value="table" onChange={onValueTypeChange} checked={item.value.type == 'table'} />
                        <label>Table</label>
                    </div>
                    <div>
                        <input type="radio" name="value-type" value="extra" onChange={onValueTypeChange} checked={item.value.type == 'extra'} />
                        <label>Extra</label>
                    </div>
                </div>
                <div>
                    <h2>Value</h2>
                    { (item.value.type == 'static' || item.value.type == 'income')&&
                        <input 
                            type="number" 
                            defaultValue={item.value.amount} 
                            onBlur={(e) => {
                                dispatch(updateItem(itemId, { ...item, value: { ...item.value, amount: parseInt(e.target.value) } }));
                            }} 
                        />
                    }

                    { item.value.type == 'table' && 
                        <InputTable 
                            rows={item.value.rows} 
                            onChange={(newRows) => dispatch(updateItem(itemId, {
                                ...item,
                                value: { ...item.value, rows: newRows }
                            }))}
                        />
                    }

                    {
                        item.value.type == 'extra' &&
                        <div>Calculated from other buckets</div>
                    }

                </div>
            </>
        }

    </Card>
}