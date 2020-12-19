import {createSelector} from 'reselect';

export const itemBorrowsSelectorFactory = itemId => createSelector(
    state => state.borrows,
    borrows => Object.keys(borrows)
        .reduce((acc, id) => {
            let borrow = borrows[id];
            if (borrow.toId == itemId) {
                acc.additions.push({
                    amount: borrow.amount,
                    target: borrow.fromId
                })
            } else if (borrow.fromId == itemId) {
                acc.subtractions.push({
                    amount: borrow.amount,
                    target: borrow.toId
                })
            }
            return acc;
        }, {
            additions: [],
            subtractions: []
        })
)