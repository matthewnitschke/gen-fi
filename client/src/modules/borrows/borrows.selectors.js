import {createSelector} from 'reselect';

export const itemBorrowsSelectorFactory = itemId => createSelector(
    state => state.borrows,
    borrows => Object.keys(borrows)
        .reduce((acc, id) => {
            let borrow = borrows[id];
            if (borrow.toId == itemId) {
                acc.to.push(borrow)
            } else if (borrow.fromId == itemId) {
                acc.from.push(borrow)
            }
            return acc;
        }, {
            to: [],
            from: [],
        })
)