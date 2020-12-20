import { itemsReducer } from '../../../src/modules/items/items.reducer.js';
import {
  addBucket,
  addBucketGroup,
  updateItem,
  deleteItem,
  addTransactionToItem,
} from '../../../src/modules/items/items.actions.js';

const testItems = {
  group: {
    label: 'Something',
    items: ['item__in-group', 'item__in-group__2'],
  },
  'item__in-group': { label: null, value: { type: 'static', amount: 3 } },
  'item__in-group__2': {
    label: 'in group2!',
    value: { type: 'static', amount: 3 },
  },
  'item__not-in-group': { label: 'Not null?', value: { type: 'extra' } },
};

describe('items reducer', () => {
  it('should return default state', () => {
    expect(itemsReducer(undefined, {})).toEqual({});
  });

  it('should add a root bucket', () => {
    let items = itemsReducer(testItems, addBucket());

    // uuid of the newly created bucket
    let newBucketKey = Object.keys(items).filter(
      (key) => !Object.keys(testItems).includes(key)
    )[0];

    let expectedItems = {
      ...testItems,
      [newBucketKey]: {
        label: null,
        value: { type: 'static', amount: 0 },
        transactions: [],
      },
    };

    expect(items).toEqual(expectedItems);
  });

  it('should add a bucket with a parent', () => {
    let parentKey = 'parentKey';
    let items = itemsReducer(
      {
        ...testItems,
        [parentKey]: { label: null, items: [] },
      },
      addBucket(parentKey)
    );

    // uuid of the newly created bucket
    let newBucketKey = Object.keys(items).filter((key) => {
      return key != parentKey && !Object.keys(testItems).includes(key);
    })[0];

    let expectedItems = {
      ...testItems,
      [parentKey]: {
        label: null,
        items: [newBucketKey],
      },
      [newBucketKey]: {
        label: null,
        value: { type: 'static', amount: 0 },
        transactions: [],
      },
    };

    expect(items).toEqual(expectedItems);
  });

  it('should add bucket group', () => {
    let items = itemsReducer(testItems, addBucketGroup());

    let newBucketGroupKey = Object.keys(items).filter(
      (key) => !Object.keys(testItems).includes(key)
    )[0];

    let expectedItems = {
      ...testItems,
      [newBucketGroupKey]: {
        label: null,
        items: [],
      },
    };

    expect(items).toEqual(expectedItems);
  });

  it('should update item', () => {
    let updatedItem = {
      label: 'heyy',
      value: { type: 'income', amount: 99 },
    };

    let items = itemsReducer(testItems, updateItem('item', updatedItem));

    let expectedItems = {
      ...testItems,
      item: updatedItem,
    };

    expect(items).toEqual(expectedItems);
  });

  it('should delete item not in group', () => {
    let deleteKey = 'item__not-in-group';
    let items = itemsReducer(testItems, deleteItem(deleteKey));

    let expectedItemKeys = Object.keys(testItems).filter(
      (key) => key != deleteKey
    );

    expect(Object.keys(items)).toEqual(expectedItemKeys);
  });

  it('should delete item in group', () => {
    let deleteKey = 'item__in-group';
    let items = itemsReducer(testItems, deleteItem(deleteKey));

    let expectedItemKeys = Object.keys(testItems).filter(
      (key) => key != deleteKey
    );
    let expectedGroupKeys = testItems['group'].items.filter(
      (key) => key != deleteKey
    );

    expect(Object.keys(items)).toEqual(expectedItemKeys);
    expect(items['group'].items).toEqual(expectedGroupKeys);
  });

  it('should delete group item and its children', () => {
    let deleteKey = 'group';
    let items = itemsReducer(testItems, deleteItem(deleteKey));

    expect(Object.keys(items)).toEqual(['item__not-in-group']);
  });

  it('should add transaction to item', () => {
    let itemKey = 'item__not-in-group';
    let transactionId = 'someTransactionId';

    let items = itemsReducer(
      testItems,
      addTransactionToItem(itemKey, transactionId)
    );

    expect(items[itemKey].transactions).toEqual(
      expect.arrayContaining([transactionId])
    );
  });
});
