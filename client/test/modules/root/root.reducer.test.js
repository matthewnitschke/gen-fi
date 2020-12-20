import { rootReducer } from '../../../src/modules/root/root.reducer.js';
import {
  selectItem,
  selectTransaction,
  ignoreTransaction,
  setSelectedMonth,
  loadBudget,
} from '../../../src/modules/root/root.actions.js';

describe('root reducer', () => {
  it('should return default state', () => {
    let state = rootReducer(undefined, {});
    expect(state).toEqual({});
  });

  it('should select item', () => {
    let selectedItemId = 'a';
    let state = rootReducer({}, selectItem(selectedItemId));

    expect(state.selectedItemId).toEqual(selectedItemId);
  });

  it('should select transaction', () => {
    let selectedTransactionId = 'a';
    let state = rootReducer({}, selectTransaction(selectedTransactionId));

    expect(state.selectedTransactionId).toEqual(selectedTransactionId);
  });

  it('should ignore transaction', () => {
    let state = rootReducer(
      {
        ignoredTransactionIds: ['a'],
      },
      ignoreTransaction('b')
    );

    expect(state.ignoredTransactionIds).toEqual(expect.arrayContaining(['b']));
  });

  it('should set the selected month', () => {
    let newDate = new Date('2-2-2');
    let state = rootReducer(
      {
        selectedMonth: new Date('1-1-1'),
        transactions: { a: {} },
        items: { b: {} },
        borrows: { c: {} },
      },
      setSelectedMonth(newDate)
    );

    expect(state).toEqual(
      expect.objectContaining({
        selectedMonth: newDate,
        transactions: {},
        items: {},
        borrows: {},
      })
    );
  });

  it('should load budget', () => {
    let newData = { a: 'b' };
    let existingData = { c: 'd' };
    let state = rootReducer(existingData, loadBudget(newData));

    expect(state).toEqual({
      ...newData,
      ...existingData,
    });
  });
});
