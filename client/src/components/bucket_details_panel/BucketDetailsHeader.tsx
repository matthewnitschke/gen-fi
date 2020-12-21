import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, updateItem } from '../../modules/items/items.actions.js';
import { selectItem } from '../../modules/root/root.actions.js';

import { itemValueSelectorFactory } from '../../modules/items/items.selectors.js';
import { assignedTransactionsSumSelectorFactory } from '../../modules/transactions/transactions.selectors.js';

import ProgressIndicator from '../util/ProgressIndicator';
import { AppState } from '../../redux/state';
import PanelHeaderToolbar from '../util/PanelHeaderToolbar';

export default function BucketDetailsHeader({ itemId }) {
  const dispatch = useDispatch();

  const item = useSelector((state: AppState) => state.items[itemId]);
  const itemAmount = useSelector<AppState, number>(
    itemValueSelectorFactory(itemId)
  );
  const transactionSumAmount = useSelector<AppState, number>(
    assignedTransactionsSumSelectorFactory(itemId)
  );

  return (
    <>
      <PanelHeaderToolbar
        onDelete={() => {
          dispatch(selectItem(null));
          dispatch(deleteItem(itemId));
        }}
        onClose={() => {
          dispatch(selectItem(null));
        }}
      />

      <div className="header">
        <div className="label">{item.label}</div>
        <div className="amount">${itemAmount}</div>
      </div>

      <ProgressIndicator value={transactionSumAmount} max={itemAmount} />
    </>
  );
}
