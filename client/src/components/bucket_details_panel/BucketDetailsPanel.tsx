import React, { useState } from 'react';
import 'styles/bucket_details_panel.scss';
import Card from '../util/Card';
import Tabs from '../util/Tabs';
import BucketDetailsHeader from './BucketDetailsHeader';
import ItemBorrows from './ItemBorrows';
import ItemTransactions from './ItemTransactions';
import ItemValueEditor from './ItemValueEditor';

export default function BucketDetailsPanel({ itemId }) {
  const [selectedTab, setSelectedTab] = useState('Details');

  return (
    <Card className="details-panel">
      <BucketDetailsHeader itemId={itemId} />

      <Tabs
        items={['Details', 'Settings']}
        selectedItem={selectedTab}
        onSelectItem={setSelectedTab}
      />

      {selectedTab == 'Details' && (
        <div>
          <ItemTransactions itemId={itemId} />
          <ItemBorrows itemId={itemId} />
        </div>
      )}

      {selectedTab == 'Settings' && <ItemValueEditor itemId={itemId} />}
    </Card>
  );
}
