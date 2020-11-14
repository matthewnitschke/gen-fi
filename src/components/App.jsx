import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import BucketGroup from './BucketGroup.jsx';
import Bucket from './Bucket.jsx';
import Transactions from './Transactions.jsx';

import '../styles/app.scss';

export default function App() {
    return <div>
        <DndProvider backend={HTML5Backend}>
            <BucketGroup label="Groceries">
                <Bucket label="Groceries 1 ${moment().format('Do')}" amount={150.00} />
                <Bucket label="Groceries 2" amount={150.00} />
            </BucketGroup>

            <Transactions />
        </DndProvider>
    </div>
}