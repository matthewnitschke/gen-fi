import { createSelector } from 'reselect';

function itemSelectorAux(items, itemId) {
    let keys = Object.keys(items);
    for (let i  = 0; i < keys.length; i ++) {
        if (keys[i] == itemId) {
            return items[key];
        } else if (items[key].items) {
            let resp = itemSelectorAux(items[key].items)
            if (resp != null) {
                return resp;
            }
        }
    }
}

export const itemSelector = createSelector(
    (state, itemId) => {
        return itemSelectorAux(state.items, itemId);
    },
)

