export const addBorrow = (toId: string, fromId: string, amount: number) => ({
  type: 'ADD_BORROW',
  toId,
  fromId,
  amount,
});
