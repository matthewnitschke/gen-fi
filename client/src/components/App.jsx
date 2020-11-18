import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { connect, useSelector } from 'react-redux';

import BucketGroup from './BucketGroup.jsx';
import Bucket from './Bucket.jsx';
import Transactions from './Transactions.jsx';
import Card from './util/Card.jsx';
import RootNewButton from './RootNewButton.jsx';
import BucketDetailsPanel from './BucketDetailsPanel.jsx';

import { getItem } from '../utils.js';


import '../styles/app.scss';

export default function App() {

    const items = useSelector(state => state.items);
    const itemsOrder = useSelector(state => state.itemsOrder);

    const selectedItemId = useSelector(state => state.selectedItemId)

    return <div className="app">
        <div className="main-content">
            {itemsOrder.map((order) => {
                let { itemId } = order

                let isGroup = order.hasOwnProperty('items');
                
                return <Card key={itemId}>
                    { isGroup && <BucketGroup itemId={itemId}/> }
                    { !isGroup && <Bucket itemId={itemId} /> }
                </Card>
            })}
            
            <RootNewButton />
        </div>
        { selectedItemId &&
            <BucketDetailsPanel itemId={selectedItemId} />
        }

        
        {/* <DndProvider backend={HTML5Backend}></DndProvider> */}
        {/* <Transactions /> */}
    </div>
}