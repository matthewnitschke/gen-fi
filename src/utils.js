function itemSelectorAux(items, itemId) {
    let keys = Object.keys(items);
    for (let i  = 0; i < keys.length; i ++) {
        var key = keys[i];

        if (key == itemId) {
            return items[key];
        } else if (items[key].items) {
            let resp = itemSelectorAux(items[key].items, itemId)
            if (resp != null) {
                return resp;
            }
        }
    }
}

export function getItem(state, itemId) {
    return itemSelectorAux(state.items, itemId)
}