import { createSelector } from 'reselect';

import { itemBorrowsSelectorFactory } from '../borrows/borrows.selectors.js';

import { objToListConverter } from '../../utils';

// Calculates the final value of an item, factoring in different value types,
// with the additions and subtractions from borrows
export const itemValueSelectorFactory = itemId => createSelector(
    state => objToListConverter(state.items),
    state => state.items[itemId],
    itemBorrowsSelectorFactory(itemId),
    (items, item, borrows) => {
        if (!item) {
            console.error(`Item with id of: ${itemId} not found`);
            return 0;
        }

        let valueSum = getItemsValue(items, item);

        borrows.subtractions.forEach(({ amount }) => valueSum -= amount);
        borrows.additions.forEach(({ amount }) => valueSum += amount);

        return valueSum;
    }
);

// // selects only the items that should be rendered at the root of the item tree
// export const rootItemsSelectorFactory = () => createSelector(
//     state => objToListConverter(state.items), // convert the item map into a item list
//     items => {
//         let subItemKeys = items.reduce(
//             (acc, item) => item.items ? [...acc, ...item.items] : acc, 
//             []
//         );
       
//         let rootItems = items.filter(item => !subItemKeys.includes(item.id))

//         rootItems.sort((a, b) => {
//             let aOrder = a ?? Number.MAX_SAFE_INTEGER;
//             let bOrder = b ?? Number.MAX_SAFE_INTEGER;

//             return aOrder - bOrder;
//         })

//         return rootItems;
//     }
// )

export const bucketItemsSelectorFactory = () => createSelector(
    state => objToListConverter(state.items),
    items => {
        return items.filter(item => !item.hasOwnProperty('items'))
    }
)

export const hasExtraItemTypeSelectorFactory = () => createSelector(
    state => state.items,
    items => {
        let extraTypes = Object.keys(items)
            .find(id => items[id]?.value?.type == 'extra');

        return extraTypes != null;
    }
)

// ---------------------- utils ----------------------

// Returns the value (as an integer) of an item, correctly handling different
// item types
const getItemsValue = (items, item) => {
    const type = item.value.type;

    if (type == 'income' || type == 'static') {
        return item.value.amount;
    } else if (type == 'table') {
        // sniff test, rows might be null
        if (!item.value.rows) return 0

        return item.value.rows.reduce(
            (acc, row) => acc + row.amount,
            0
        )
    } else if (type == 'extra') {
        let buckets = items.filter(item => !item.items)

        let incomeTotal = buckets
            .filter(item => item.value.type == 'income')
            .reduce((acc, item) => acc + item.value.amount, 0);
        
        let subtractionsTotal = buckets
            .filter(item => !['income', 'extra'].includes(item.value.type))
            .reduce((acc, item) => acc + getItemsValue(items, item), 0)

        return incomeTotal - subtractionsTotal
    }

    return 0;
}
