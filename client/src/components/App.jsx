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

    const selectedItemId = useSelector(state => state.selectedItemId)
    
    return <div className="app">
        <DndProvider backend={HTML5Backend}>
            <div className="main-content">
                {items.map((item) => {
                    let { id } = item

                    let isGroup = item.hasOwnProperty('items');
                    
                    return <Card key={id}>
                        { isGroup && <BucketGroup itemId={id}/> }
                        { !isGroup && <Bucket itemId={id} /> }
                    </Card>
                })}
                
                <RootNewButton />
            </div>
            { selectedItemId &&
                <BucketDetailsPanel itemId={selectedItemId} />
            }

            <Transactions />
        </DndProvider>
    </div>
}