export function transactionsReducer(transactions = {}, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...transactions,
        [action.transaction._id]: action.transaction,
      };
  }

  return transactions;
}
