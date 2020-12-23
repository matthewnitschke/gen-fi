import { createSelector } from 'reselect';
import { AppState } from '../../redux/state';

export const itemBorrowsSelectorFactory = (itemId: string) =>
  createSelector(
    (state: AppState) => state.borrows,
    (borrows) =>
      Object.keys(borrows).reduce(
        (acc, id) => {
          let borrow = borrows[id];
          if (borrow.toId == itemId) {
            acc.additions.push({
              amount: borrow.amount,
              target: borrow.fromId,
            });
          } else if (borrow.fromId == itemId) {
            acc.subtractions.push({
              amount: borrow.amount,
              target: borrow.toId,
            });
          }
          return acc;
        },
        {
          additions: [],
          subtractions: [],
        }
      )
  );
