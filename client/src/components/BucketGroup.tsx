import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addBucket, updateItem } from '../modules/items/items.actions';
import { selectItem } from '../modules/root/root.actions';
import { AppState } from '../redux/state';

import Bucket from './Bucket';
import TextInput from './util/TextInput';

export default function BucketGroup({ itemId }) {
  let dispatch = useDispatch();

  const item = useSelector((state: AppState) => state.items[itemId]);
  const subItems = useSelector((state: AppState) => state.items[itemId].items);

  return (
    <div className="bucket-group">
      <div
        className="label"
        onClick={() => {
          dispatch(selectItem(itemId));
        }}
      >
        <TextInput
          value={item.label}
          placeholder="Label"
          onValueChange={(v) => {
            return dispatch(updateItem(itemId, { ...item, label: v }));
          }}
        />
      </div>
      <div>
        {subItems.map((subItemId) => {
          return <Bucket key={subItemId} itemId={subItemId} />;
        })}
      </div>
      <div style={{ marginTop: '.5rem' }}>
        <a
          className="link"
          onClick={() => {
            return dispatch(addBucket(itemId));
          }}
        >
          Add Item
        </a>
      </div>
    </div>
  );
}
