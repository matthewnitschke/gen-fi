import { borrowsReducer } from '../../../src/modules/borrows/borrows.reducer';
import { addBorrow } from '../../../src/modules/borrows/borrows.actions';

describe('borrows reducer', () => {
  it('should return default state', () => {
    let borrows = borrowsReducer(undefined, {});
    expect(borrows).toEqual({});
  });

  it('should add transaction', () => {
    let borrows = borrowsReducer({}, addBorrow('to', 'from', 99));

    let newBorrowKey = Object.keys(borrows)[0];

    expect(borrows).toEqual({
      [newBorrowKey]: { toId: 'to', fromId: 'from', amount: 99 },
    });
  });
});
