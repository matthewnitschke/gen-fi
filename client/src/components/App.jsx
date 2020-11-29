import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { loadBudget } from '../modules/thunks.js';

import BucketGroup from './BucketGroup.jsx';
import Bucket from './Bucket.jsx';
import Transactions from './Transactions.jsx';
import Card from './util/Card.jsx';
import RootNewButton from './RootNewButton.jsx';
import BucketDetailsPanel from './BucketDetailsPanel.jsx';

import { rootItemsSelectorFactory } from '../modules/items/items.selectors.js';


import '../styles/app.scss';
import MonthSelector from './MonthSelector.jsx';
import TransactionDetailsPanel from './TransactionDetailsPanel.jsx';

export default function App() {
    const dispatch = useDispatch();
    const rootItems = useSelector(rootItemsSelectorFactory());
    const selectedItemId = useSelector(state => state.selectedItemId);
    const selectedTransactionId = useSelector(state => state.selectedTransactionId);
    const selectedMonth = useSelector(state => state.selectedMonth);

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
            { selectedItemId &&
                <BucketDetailsPanel itemId={selectedItemId} />
            }

            {
                selectedTransactionId &&
                <TransactionDetailsPanel transactionId={selectedTransactionId} />
            }
        </div>

        <Transactions />
    </DndProvider>
    
}