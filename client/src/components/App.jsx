import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { loadBudget } from '../modules/thunks.js';

import BucketGroup from './BucketGroup';
import Bucket from './Bucket';
import Transactions from './Transactions';
import Card from './util/Card';
import RootNewButton from './RootNewButton';
import BucketDetailsPanel from './bucket_details_panel/BucketDetailsPanel';
import BucketGroupDetailsPanel from './BucketGroupDetailsPanel';

import { rootItemsSelectorFactory } from '../modules/items/items.selectors.js';


import '../styles/app.scss';
import MonthSelector from './MonthSelector.jsx';
import TransactionDetailsPanel from './TransactionDetailsPanel.jsx';

export default function App() {
    const dispatch = useDispatch();
    const rootItems = useSelector(rootItemsSelectorFactory());
    const selectedTransactionId = useSelector(state => state.selectedTransactionId);
    const selectedMonth = useSelector(state => state.selectedMonth);

    const selectedItemId = useSelector(state => state.selectedItemId);
    const isSelectedItemAGroup = useSelector(
        state => state.items[state.selectedItemId],
    )?.hasOwnProperty('items') == true;

    useEffect(() => {
        dispatch(loadBudget(selectedMonth))
    }, [])
    
    return <DndProvider backend={HTML5Backend}>
        <div className="main-content">
            <MonthSelector />
            {rootItems.map((item) => {
                let isGroup = !!item.items

                return <Card key={item.id}>
                    { isGroup && <BucketGroup itemId={item.id}/> }
                    { !isGroup && <Bucket itemId={item.id} /> }
                </Card>
            })}
            
            <RootNewButton />
        </div>

        <div className="rhp">
            {/* <div>
                <BankAccountsButton />
            </div> */}
            { selectedItemId && !isSelectedItemAGroup &&
                <BucketDetailsPanel itemId={selectedItemId} />
            }
            { selectedItemId && isSelectedItemAGroup &&
                <BucketGroupDetailsPanel itemId={selectedItemId} />
            }

            {
                selectedTransactionId &&
                <TransactionDetailsPanel transactionId={selectedTransactionId} />
            }
        </div>

        <Transactions />
    </DndProvider>
    
}