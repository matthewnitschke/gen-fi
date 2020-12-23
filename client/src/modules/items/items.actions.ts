import { v4 as uuid } from 'uuid';
import { Item } from '../../redux/state';

export const addBucket = (parentId?: string, itemId: string = uuid()) => ({
  type: 'ADD_BUCKET',
  itemId,
  label: 'Label',
  parentId,
  updateDB: true,
});

export const addBucketGroup = (itemId: string = uuid()) => ({
  type: 'ADD_BUCKET_GROUP',
  itemId,
  label: 'Label',
  updateDB: true,
});

export const updateItem = (itemId: string, item: Item) => ({
  type: 'UPDATE_ITEM',
  itemId,
  item,
  updateDB: true,
});

export const deleteItem = (itemId: string) => ({
  type: 'DELETE_ITEM',
  itemId,
  updateDB: true,
});

export const addTransactionToItem = (
  itemId: string,
  transactionId: string
) => ({
  type: 'ADD_TRANSACTION_TO_ITEM',
  itemId,
  transactionId,
  updateDB: true,
});
