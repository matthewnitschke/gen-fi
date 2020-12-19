import React, {useRef, useState} from 'react';

import Card from '../util/Card.jsx';
import BucketDetailsHeader from './BucketDetailsHeader.jsx';

import 'styles/bucket_details_panel.scss';
import { useSelector, useDispatch } from 'react-redux';

import { updateItem} from '../../modules/items/items.actions.js'

import InputTable from '../util/InputTable.jsx';
import Tabs from '../util/Tabs.jsx';
import { hasExtraItemTypeSelectorFactory } from '../../modules/items/items.selectors.js';
import { assignedTransactionsSelectorFactory } from '../../modules/transactions/transactions.selectors.js';
import { itemBorrowsSelectorFactory } from '../../modules/borrows/borrows.selectors.js';
import ItemValueEditor from './ItemValueEditor.jsx';

export default function BucketDetailsPanel({ itemId }) {
    const ref = useRef();
    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = useState("Details");

    const items = useSelector(state => state.items);
    const item = useSelector(state => state.items[itemId]);
    const itemTransactions = useSelector(assignedTransactionsSelectorFactory(itemId));
    const itemBorrows = useSelector(itemBorrowsSelectorFactory(itemId))

    // useOnClickOutside(ref, () => dispatch(selectItem(null)))

    return <Card ref={ref} className="details-panel">
       <BucketDetailsHeader itemId={itemId} />

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

        { selectedTab == "Settings" && <ItemValueEditor itemId={itemId} /> }

    </Card>
}