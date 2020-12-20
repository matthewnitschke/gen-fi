import React, { useState, useRef } from 'react';

import Card from './util/Card';

import '../styles/root_new_button.scss';
import { useDispatch } from 'react-redux';
import { addBucket, addBucketGroup } from '../modules/items/items.actions.js';

export default function RootNewButton() {
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();

  return (
    <div
      className="root-new-button"
      onClick={() => {
        setIsClicked(true);
      }}
    >
      <Card skin="dashed">
        {!isClicked && 'Add'}

        {isClicked && (
          <>
            <a
              className="link"
              style={{ marginRight: '1rem' }}
              onClick={(e) => {
                dispatch(addBucketGroup());
              }}
            >
              Add Group
            </a>
            <a className="link" onClick={() => dispatch(addBucket())}>
              Add Bucket
            </a>
          </>
        )}
      </Card>
    </div>
  );
}
