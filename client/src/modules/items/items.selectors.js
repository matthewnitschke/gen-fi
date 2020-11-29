import { createSelector } from 'reselect';

import { itemBorrowsSelectorFactory } from '../borrows/borrows.selectors.js';

import { objToListConverter } from '../../utils.js';

// Calculates the final value of an item, factoring in different value types,
// with the additions and subtractions from borrows
export const itemValueSelectorFactory = itemId => createSelector(
    state => objToListConverter(state.items),
    state => state.items[itemId],
    itemBorrowsSelectorFactory(itemId),
    (items, item, borrows) => {
        if (!item) throw new Error(`Item with id of: '${itemId}', not found`)

        let valueSum = getItemsValue(items, item);

        borrows.to.forEach(borrow => valueSum -= borrow.amount);
        borrows.from.forEach(borrow => valueSum += borrow.amount);

        return valueSum;
    }
);

// selects only the items that should be rendered at the root of the item tree
export const rootItemsSelectorFactory = () => createSelector(
    state => objToListConverter(state.items), // convert the item map into a item list
    items => {
        let subItemKeys = items.reduce(
            (acc, item) => item.items ? [...acc, ...item.items] : acc, 
            []
        );
       
        return items.filter(item => !subItemKeys.includes(item.id))
    }
)

export const hasExtraItemTypeSelectorFactory = () => createSelector(
    state => state.items,
    items => Object.keys(items)
        .find(id => items[id].value.type == 'extra')
        .length >= 1
)

// ---------------------- utils ----------------------

// Returns the value (as an integer) of an item, correctly handling different
// item types
const getItemsValue = (items, item) => {
    const type = item.value.type;

    if (type == 'income' || type == 'static') {
        return item.value.amount;
    } else if (type == 'table') {
        return item.value.rows.reduce(
            (acc, row) => acc + row.amount,
            0
        )
    } else if (type == 'extra') {
        let buckets = items.filter(id => !items[id].items)

        let incomeTotal = buckets
            .filter(id => items[id].value.type == 'income')
            .reduce((acc, id) => acc + items[id].value.amount, 0);
        
        let subtractionsTotal = buckets
            .filter(id => !['income', 'extra'].includes(items[id].value.type))
            .reduce((acc, id) => acc + getItemsValue(items, items[id]), 0)

        return incomeTotal - subtractionsTotal
    }

    return 0;
}
