import React, { useState, useRef } from 'react';

import Card from './util/Card';

import '../styles/root_new_button.scss';
import { useDispatch } from 'react-redux';
import { addBucket, addBucketGroup } from '../modules/items/items.actions';
import styled from 'styled-components';
import Button, { ButtonSkin } from './util/Button';

const NewRootButtonStyled = styled.div`
  display: flex;
  align-items: center;

  .add-button {
    margin-right: 1rem;
    transition: transform .2s;
    &.rotate {
      transform: rotate(45deg);
    }
  }
`;

export default function RootNewButton() {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const dispatch = useDispatch();

  return (
    <NewRootButtonStyled>
      <Button
        skin={ButtonSkin.add}
        className={`add-button ${isOptionsVisible ? 'rotate' : ''}`}
        onClick={() => setIsOptionsVisible(!isOptionsVisible)}
      />
      {isOptionsVisible && (
        <>
          <Button 
            skin={ButtonSkin.link}
            value="Group"
            style={{ marginRight: '1rem' }}
            onClick={ () => dispatch(addBucketGroup()) }/>
          <Button 
            skin={ButtonSkin.link} 
            value="Bucket"
            onClick={ () => dispatch(addBucket()) }/>
          {/* <a
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
          </a> */}
        </>
      )}

      {/* <Card skin="dashed">
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
      </Card> */}
    </NewRootButtonStyled>
  );
}
