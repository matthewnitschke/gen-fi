import {createSelector} from 'reselect';

const borrowsSelector = state => state.borrows;

export const itemBorrowsSelectorFactory = itemId => createSelector(
    borrowsSelector,
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