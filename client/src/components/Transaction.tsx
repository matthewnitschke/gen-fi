import React from 'react';

import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { ignoreTransaction } from '../modules/root/root.actions';
import { addTransactionToItem } from '../modules/items/items.actions';

import { selectTransaction } from '../modules/root/root.actions';

import IgnoreTransactionDropzone from './IgnoreTransactionDropzone';
import { AppState } from '../redux/state';
import styled from 'styled-components';

const TransactionStyled = styled.div`
  margin: 0.5rem;
  margin-right: 0;
  border-radius: 100%;
  border: solid 2px orange;
  width: 5rem;
  height: 5rem;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.income .amount {
    color: var(--green);
  }

  .amount {
    font-weight: 600;
    font-size: 1.1rem;
  }

  .merchant {
    color: lightgrey;
    font-size: 0.8rem;
    text-align:center;
  }
`;

export default function Transaction({ transactionId }) {
  const dispatch = useDispatch();

  const transaction = useSelector(
    (state: AppState) => state.transactions[transactionId]
  );

  const [{ isDragging }, drag] = useDrag({
    item: { amount: transaction.amount, type: 'transaction' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (dropResult.ignore) {
          dispatch(ignoreTransaction(transactionId));
        } else {
          dispatch(addTransactionToItem(dropResult.itemId, transactionId));
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <>
      {isDragging && <IgnoreTransactionDropzone />}

      <TransactionStyled
        ref={drag}
        style={{ visibility: isDragging ? 'hidden' : 'initial' }}
        onClick={() => dispatch(selectTransaction(transactionId))}
        className={transaction.amount < 0 ? 'income' : ''}
      >
        <div className="amount">${Math.abs(transaction.amount)}</div>
        <div className="merchant">{transaction.merchant}</div>
      </TransactionStyled>
    </>
  );
}
