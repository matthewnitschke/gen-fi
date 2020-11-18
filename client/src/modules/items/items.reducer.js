import { v4 as uuid } from 'uuid';

export function items(state, action) {
    switch(action.type) {
        case 'ADD_BUCKET':
            var newItemId = uuid();
            
            var updatedItemOrder = [ ...state.itemsOrder ]
            if (action.parentId) {
                updatedItemOrder = updatedItemOrder.map((item) => {
                    if (item.itemId == action.parentId) {
                        item.items.push(newItemId)
                    }
                    return item;
                })
            } else {
                updatedItemOrder.push({ itemId: newItemId })
            }

            return {
                ...state,
                items: { 
                    ...state.items,
                    [newItemId]: { label: action.label, amount: 0, maxAmount: 0 }
                },
                itemsOrder: updatedItemOrder
            };
            
        case 'ADD_BUCKET_GROUP':
            var newItemId = uuid();
            return {
                ...state,
                items: {
                    ...state.items,
                    [newItemId]: { label: action.label }
                },
                itemsOrder: [
                    ...state.itemsOrder,
                    { itemId: newItemId, items: [] }
                ]
            }

        case 'UPDATE_ITEM':
            var updatedItem = Object.assign(
                {},
                state.items[action.itemId], 
                {
                    label: action.label,
                    amount: action.amount
                },
            );

            return {
                ...state,
                items: { 
                    ...state.items,
                    [action.itemId]: updatedItem
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