import { v4 as uuid } from 'uuid';

export function items(state, action) {
    switch(action.type) {
        case 'ADD_BUCKET':
            let updatedItems = { ...state.items }
            
            let newBucket = { label: action.label, amount: 0, maxAmount: 0 }
            if (action.parentId) {
                updatedItems[action.parentId].items[uuid()] = newBucket;
            } else {
                updatedItems[uuid()] = newBucket;
            }

            return {
                ...state,
                items: updatedItems
            };
            
        case 'ADD_BUCKET_GROUP':
            return {
                ...state,
                items: {
                    ...state.items,
                    [uuid()]: { label: action.label, items: [] }
                }
            }

        case 'SELECT_BUCKET':
            return {
                ...state,
                selectedItemId: action.itemId
            }
    }

    return state;
}