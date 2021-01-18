import React from 'react';
import { useSelector } from 'react-redux';
import { itemBorrowsSelectorFactory } from '../../modules/borrows/borrows.selectors';
import { AppState } from '../../redux/state';
import AddBorrowButton from './AddBorrowButton';

interface ContextualBorrows {
  additions: Array<ContextualBorrow>;
  subtractions: Array<ContextualBorrow>;
}

interface ContextualBorrow {
  target: string;
  amount: number;
}

interface ItemBorrowsProps {
  itemId: string
}

export default function ItemBorrows({ itemId }: ItemBorrowsProps) {
  const items = useSelector((state: AppState) => state.items);
  const itemBorrows = useSelector<any, ContextualBorrows>(
    itemBorrowsSelectorFactory(itemId)
  );

  return (
    <>
      <h2>Borrows</h2>

      <h4>From</h4>
      {itemBorrows.additions.map((borrow, i) => (
        <div key={i}>
          {items.get(borrow.target)!.label}: ${borrow.amount}
        </div>
      ))}

      <h4>To</h4>
      {itemBorrows.subtractions.map((borrow, i) => (
        <div key={i}>
          {items.get(borrow.target)!.label}: -${borrow.amount}
        </div>
      ))}

      <AddBorrowButton />
    </>
  );
}
