import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, updateItem } from '../../modules/items/items.actions';
import { selectItem } from '../../modules/root/root.actions';

import { itemValueSelectorFactory } from '../../modules/items/items.selectors';
import { assignedTransactionsSumSelectorFactory } from '../../modules/transactions/transactions.selectors';

import ProgressIndicator from '../util/ProgressIndicator';
import { AppState } from '../../redux/state';
import PanelHeaderToolbar from '../util/PanelHeaderToolbar';

interface BucketDetailsHeaderProps {
  itemId: string
}

export default function BucketDetailsHeader({ itemId }: BucketDetailsHeaderProps) {
  const dispatch = useDispatch();

  const item = useSelector((state: AppState) => state.items.get(itemId)!);
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
          dispatch(selectItem(undefined));
          dispatch(deleteItem(itemId));
        }}
        onClose={() => {
          dispatch(selectItem(undefined));
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
