import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { connect, shallowEqual, useSelector } from 'react-redux';
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

export default function App() {
    const dispatch = useDispatch();
    const rootItems = useSelector(
        rootItemsSelectorFactory(),
    );
    const selectedItemId = useSelector(state => state.selectedItemId);
    const selectedMonth = useSelector(state => state.selectedMonth);

    useEffect(() => {
        dispatch(loadBudget(selectedMonth))
    }, [])
    
    return <DndProvider backend={HTML5Backend}>
        <div className="main-content">
            <MonthSelector />
            {Object.keys(rootItems).map((itemId) => {
                let item = rootItems[itemId];
                let isGroup = item.hasOwnProperty('items')

                return <Card key={itemId}>
                    { isGroup && <BucketGroup itemId={itemId}/> }
                    { !isGroup && <Bucket itemId={itemId} /> }
                </Card>
            })}
            
            <RootNewButton />
        </div>

        <div className="rhp">
            { selectedItemId &&
                <BucketDetailsPanel itemId={selectedItemId} />
            }
        </div>

        <Transactions />
    </DndProvider>
    
}