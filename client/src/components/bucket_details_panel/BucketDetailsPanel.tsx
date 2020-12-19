import React, {useRef, useState} from 'react';

import Card from '../util/Card';
import BucketDetailsHeader from './BucketDetailsHeader';

import 'styles/bucket_details_panel.scss';
import { useSelector } from 'react-redux';

import Tabs from '../util/Tabs';
import { assignedTransactionsSelectorFactory } from '../../modules/transactions/transactions.selectors.js';
import { itemBorrowsSelectorFactory } from '../../modules/borrows/borrows.selectors.js';
import ItemValueEditor from './ItemValueEditor';
import { AppState } from '../../redux/state';
import ItemTransactions from './ItemTransactions';
import ItemBorrows from './ItemBorrows';

export default function BucketDetailsPanel({ itemId }) {
    const ref = useRef();

    const [selectedTab, setSelectedTab] = useState("Details");

    return <Card ref={ref} className="details-panel">
       <BucketDetailsHeader itemId={itemId} />

        <Tabs items={["Details", "Settings"]} selectedItem={selectedTab} onSelectItem={setSelectedTab} />

        {
            selectedTab == "Details" && 
            <div>
                <ItemTransactions itemId={itemId} />
                <ItemBorrows itemId={itemId} />
            </div>
        }

        { selectedTab == "Settings" && <ItemValueEditor itemId={itemId} /> }

    </Card>
}