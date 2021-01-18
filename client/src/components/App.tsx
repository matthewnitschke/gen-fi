import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { loadBudget } from '../modules/thunks';
import { reorderRootItemIds, selectItem } from '../modules/root/root.actions';

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
import { AppState, Item } from '../redux/state';
import Section from './util/Section';
import TransactionPanel from './transaction_panel/TransactionPanel';
import Button, { ButtonSkin } from './util/Button';

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 17rem auto 23rem;
  grid-template-rows: auto;

  column-gap: 10px;

  margin: 0 .5rem;
`;


export default function App() {
  // const dispatch = useDispatch();

  const items = useSelector((state: AppState) => new Map<String, Item>(Object.entries(state.items)));
  const rootItemIds = useSelector((state: AppState) => state.rootItemIds);

  // const selectedTransactionId = useSelector(
  //   (state: AppState) => state.selectedTransactionId
  // );
  // const selectedMonth = useSelector((state: AppState) => state.selectedMonth);

  // const selectedItemId = useSelector((state: AppState) => state.selectedItemId);
  // const isSelectedItemAGroup =
  //   useSelector(
  //     (state: AppState) => state.items.get(state.selectedItemId)!
  //   )?.hasOwnProperty('items') == true;

  // useEffect(() => {
  //   dispatch(loadBudget(selectedMonth));
  // }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main-content">
        <Section header="Transactions">
          <TransactionPanel />
        </Section>

        <Section header="Categories">
           {rootItemIds.map((itemId, i) => {
             let isGroup = items.get(itemId)!.hasOwnProperty('items');

             return (
               <>
                 {isGroup && <BucketGroup itemId={itemId} />}
                 {!isGroup && <Bucket itemId={itemId} />}
               </>
            );
          })}
          <RootNewButton />
        </Section>

        <Section header="Buttons">
          <Button value="Hi!" />
          <Button skin={ButtonSkin.add}/>
          <Button skin={ButtonSkin.close} />
        </Section>
      </div>
    </DndProvider>
  );

  // return (
  //   <DndProvider backend={HTML5Backend}>

  //     <MonthSelector />

  //     <MainContent>
  //       <Section header="Transactions">
  //           {/* <DevModalButton /> */}
  //           {/* <BankAccountsButton /> */}
  //           <TransactionPanel />
  //       </Section>

  //       <Section header="Categories">
  //         {rootItemIds.map((itemId, i) => {
  //           let isGroup = items.get(itemId)!.hasOwnProperty('items');

  //           return (
  //             <>
  //               {isGroup && <BucketGroup itemId={itemId} />}
  //               {!isGroup && <Bucket itemId={itemId} />}
  //             </>

  //             // <Card
  //             //   key={itemId}
  //             //   isReorderable={true}
  //             //   index={i}
  //             //   moveCard={(dragIndex, hoverIndex) => {
  //             //     let dragItemId = rootItemIds[dragIndex];
  //             //     dispatch(reorderRootItemIds(dragItemId, dragIndex, hoverIndex));
  //             //   }}
  //             // >
  //             //   {isGroup && <BucketGroup itemId={itemId} />}
  //             //   {!isGroup && <Bucket itemId={itemId} />}
  //             // </Card>
  //           );
  //         })}

  //         <RootNewButton />

  //       </Section>
        
  //       {
  //         selectedItemId && 
  //         <Section 
  //           header="Details" 
  //           showCloseButton={true}
  //           onCloseButtonClick={() => dispatch(selectItem(undefined))}
  //         > 
  //           {selectedItemId && !isSelectedItemAGroup && (
  //             <BucketDetailsPanel itemId={selectedItemId} />
  //           )}
  //           {selectedItemId && isSelectedItemAGroup && (
  //             <BucketGroupDetailsPanel itemId={selectedItemId} />
  //           )}
  //         </Section>
  //       }

  //       <Transactions />

  //     </MainContent>
  //   </DndProvider>
  // );
}
