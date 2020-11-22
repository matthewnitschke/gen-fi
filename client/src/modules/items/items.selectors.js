import { createSelector } from 'reselect';

import {itemBorrowsSelectorFactory} from '../borrows/borrows.selectors.js';

export const itemsSelector = state => state.items
const itemsListSelector = state => Object.keys(state.items).map(id => ({...state.items[id], id: id}))

const itemValueSumSelector = (items, item) => {
    switch (item.value.type) {
        case 'income':
        case 'static':
            return item.value.amount;
        
        case 'table':
            return item.value.rows.reduce(
                (acc, row) => acc + row.amount,
                0
            )

        case 'extra':
            let buckets = Object.keys(items).filter(id => !items[id].hasOwnProperty('items'))

            let incomeTotal = buckets
                .filter(id => items[id].value.type == 'income')
                .reduce((acc, id) => acc + items[id].value.amount, 0);
            
            let subtractionsTotal = buckets
                .filter(id => !['income', 'extra'].includes(items[id].value.type))
                .reduce((acc, id) => acc + itemValueSumSelector(items, items[id]), 0)

            return incomeTotal - subtractionsTotal
            

    }

    return 0;
}

export const itemValueSelectorFactory = itemId => createSelector(
    itemsSelector,
    itemSelectorFactory(itemId),
    itemBorrowsSelectorFactory(itemId),
    (items, item, borrows) => {
        let valueSum = itemValueSumSelector(items, item);

        borrows.to.forEach(borrow => valueSum -= borrow.amount);
        borrows.from.forEach(borrow => valueSum += borrow.amount);

        return valueSum;
    }
);

export const itemSelectorFactory = itemId => createSelector(
    itemsSelector,
    items => items[itemId]
)

// selects only the items that should be rendered at the root of the item tree
export const rootItemsSelectorFactory = () => createSelector(
    itemsSelector,
    items => {
        let subItemKeys = Object.values(items)
            .reduce((acc, item) => {
                return item.hasOwnProperty('items') ? [...acc, ...item.items] : acc
            }, []);
        
        return Object.keys(items)
            .filter(itemId => !subItemKeys.includes(itemId))
            .reduce((acc, itemId) => ({...acc, [itemId]: items[itemId]}), {})
    }
)

export const itemValueSumSelectorFactory = itemId => createSelector(
    itemsSelector,
    itemSelectorFactory(itemId),
    itemValueSumSelector
)

export const hasExtraItemTypeSelectorFactory = () => createSelector(
    itemsSelector,
    items => Object.keys(items)
        .find(id => items[id].value.type == 'extra')
        .length >= 1
)