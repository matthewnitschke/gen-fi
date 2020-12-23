import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { loadBudget } from '../modules/thunks';
import { reorderRootItemIds } from '../modules/root/root.actions';

import BucketGroup from './BucketGroup';
import Bucket from './Bucket';
import Transactions from './Transactions';
import Card from './util/Card';
import RootNewButton from './RootNewButton';
import BucketDetailsPanel from './bucket_details_panel/BucketDetailsPanel';
import BucketGroupDetailsPanel from './BucketGroupDetailsPanel';
import DevModalButton from './DevModalButton';

import '../styles/app.scss';
import MonthSelector from './MonthSelector';
import TransactionDetailsPanel from './TransactionDetailsPanel';
import BankAccountsButton from './BankAccountsButton';
import styled from 'styled-components';
import { AppState } from '../redux/state';

const LHPToolbarStyled = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin: 0.5rem;

  & > * {
    margin: 0 0.3rem;
  }
`;

export default function App() {
  const dispatch = useDispatch();

  const items = useSelector((state: AppState) => state.items);
  const rootItemIds = useSelector((state: AppState) => state.rootItemIds);

  const selectedTransactionId = useSelector(
    (state: AppState) => state.selectedTransactionId
  );
  const selectedMonth = useSelector((state: AppState) => state.selectedMonth);

  const selectedItemId = useSelector((state: AppState) => state.selectedItemId);
  const isSelectedItemAGroup =
    useSelector(
      (state: AppState) => state.items[state.selectedItemId]
    )?.hasOwnProperty('items') == true;

  useEffect(() => {
    dispatch(loadBudget(selectedMonth));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <LHPToolbarStyled>
          <DevModalButton />
          <BankAccountsButton />
        </LHPToolbarStyled>
      </div>

      <div className="main-content">
        <MonthSelector />
        {rootItemIds.map((itemId, i) => {
          let isGroup = items[itemId].hasOwnProperty('items');

          return (
            <Card
              key={itemId}
              isReorderable={true}
              index={i}
              moveCard={(dragIndex, hoverIndex) => {
                let dragItemId = rootItemIds[dragIndex];
                dispatch(reorderRootItemIds(dragItemId, dragIndex, hoverIndex));
              }}
            >
              {isGroup && <BucketGroup itemId={itemId} />}
              {!isGroup && <Bucket itemId={itemId} />}
            </Card>
          );
        })}

        <RootNewButton />
      </div>

      <div className="rhp">
        {/* <div>
                <BankAccountsButton />
            </div> */}
        {selectedItemId && !isSelectedItemAGroup && (
          <BucketDetailsPanel itemId={selectedItemId} />
        )}
        {selectedItemId && isSelectedItemAGroup && (
          <BucketGroupDetailsPanel itemId={selectedItemId} />
        )}

        {selectedTransactionId && (
          <TransactionDetailsPanel transactionId={selectedTransactionId} />
        )}
      </div>

      <Transactions />
    </DndProvider>
  );
}
