import React, { useState } from 'react';
import 'styles/bucket_details_panel.scss';
import Card from '../util/Card';
import Tabs from '../util/Tabs';
import BucketDetailsHeader from './BucketDetailsHeader';
import ItemBorrows from './ItemBorrows';
import ItemTransactions from './ItemTransactions';
// import ItemValueEditor from './ItemValueEditor';

interface BucketDetailsPanelProps {
  itemId: string
}

export default function BucketDetailsPanel({ itemId }: BucketDetailsPanelProps) {
  const [selectedTab, setSelectedTab] = useState('Details');

  return (
    <div>
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

      {/* {selectedTab == 'Settings' && <ItemValueEditor itemId={itemId} />} */}
    </div>
    // <Card className="details-panel">
    //   <BucketDetailsHeader itemId={itemId} />
    // </Card>
  );
}
