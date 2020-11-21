
export function selectedItemReducer(selectedItem = null, action) {

    switch(action.type) {
        case 'SELECT_ITEM':
            return action.itemId
    }

    return selectedItem;
}