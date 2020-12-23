// TODO: type the state value
export function rootReducer(state: any = {}, action) {
  switch (action.type) {
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItemId: action.itemId,
      };

    case 'SELECT_TRANSACTION':
      return {
        ...state,
        selectedTransactionId: action.transactionId,
      };

    case 'IGNORE_TRANSACTION':
      return {
        ...state,
        ignoredTransactionIds: [
          ...state.ignoredTransactionIds,
          action.transactionId,
        ],
      };

    case 'ADD_BUCKET':
    case 'ADD_BUCKET_GROUP':
      var newRootItemIds = [...state.rootItemIds];

      if (!action.parentId) {
        newRootItemIds.push(action.itemId);
      }

      return {
        ...state,
        rootItemIds: newRootItemIds,
      };

    case 'REORDER_ROOT_ITEM_IDS':
      var newRootItemIds = [...state.rootItemIds];

      newRootItemIds.splice(action.oldIndex, 1);
      newRootItemIds.splice(action.newIndex, 0, action.itemId);

      return {
        ...state,
        rootItemIds: newRootItemIds,
      };

    case 'DELETE_ITEM':
      return {
        ...state,
        rootItemIds: state.rootItemIds.filter(
          (itemId) => itemId != action.itemId
        ),
      };

    case 'SET_SELECTED_MONTH':
      return {
        ...state,
        selectedMonth: action.date,
        rootItemIds: [],
        transactions: {},
        items: {},
        borrows: {},
      };

    case 'LOAD_BUDGET':
      return {
        ...state,
        ...action.data,
      };
  }

  return state;
}
