import React from 'react';

import Card from './util/Card';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/state';
import { selectItem } from '../modules/root/root.actions';
import { deleteItem } from '../modules/items/items.actions';
import PanelHeaderToolbar from './util/PanelHeaderToolbar';

export default function BucketGroupDetailsPanel({ itemId }) {
  const dispatch = useDispatch();
  const groupItem = useSelector((state: AppState) => state.items[itemId]);

  return (
    <Card>
      <PanelHeaderToolbar
        onDelete={() => {
          dispatch(selectItem(null));
          dispatch(deleteItem(itemId));
        }}
        onClose={() => {
          dispatch(selectItem(null));
        }}
      />

      <h2>{groupItem.label ? groupItem.label : 'Label'}</h2>

      <p>Nothing here yet.... Future plans though :)</p>
    </Card>
  );
}
