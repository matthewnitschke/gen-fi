// simple utility to manually trigger a database update
export const updateDB = () => ({
  type: '', // no reducer actions
  updateDB: true,
});

export const selectItem = (itemId: string) => ({
  type: 'SELECT_ITEM',
  itemId,
});

export const reorderRootItemIds = (
  itemId: string,
  oldIndex: number,
  newIndex: number
) => ({
  type: 'REORDER_ROOT_ITEM_IDS',
  itemId,
  oldIndex,
  newIndex,

  // We updateDB on drop for reordering of items, for performace reasons
});

export const selectTransaction = (transactionId: string) => ({
  type: 'SELECT_TRANSACTION',
  transactionId,
});

export const setSelectedMonth = (date: Date) => ({
  type: 'SET_SELECTED_MONTH',
  date,
});

export const loadBudget = (data) => ({
  type: 'LOAD_BUDGET',
  data,
});

export const ignoreTransaction = (transactionId: string) => ({
  type: 'IGNORE_TRANSACTION',
  transactionId,
  updateDB: true,
});
