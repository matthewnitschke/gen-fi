

export const flatItemsSelector = state => {
    return state.items.reduce((accumulator, item) => {
        let subItems = item.hasOwnProperty('items') ? item.items.reduce((acc, subItem) => {
            acc[subItem.id] = subItem
            return acc
        }, {}) : {};

        return {
            ...accumulator,
            [item.id]: item,
            ...subItems
        }
    }, {});
}