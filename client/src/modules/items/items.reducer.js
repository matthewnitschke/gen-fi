import { v4 as uuid } from 'uuid';

export function itemsReducer(items = {}, action) {
    switch(action.type) {    

        case 'ADD_BUCKET':
            var newItemId = uuid();

            var updatedItems = {
                ...items,
                [newItemId]: { label: action.label, amount: 0, maxAmount: 10},
            }

            if (action.parentId) {
                updatedItems[action.parentId].items.push(newItemId)
            }

            return updatedItems
            
        case 'ADD_BUCKET_GROUP':
            return {
                ...items,
                [uuid()]: { isRoot: true, label: action.label }
            }

        case 'UPDATE_ITEM':
            console.log(action)
            console.log({
                ...items,
                [action.itemId]: action.item
            })
            return {
                ...items,
                [action.itemId]: action.item
            }

        
        case 'DELETE_ITEM':
            return Object.keys(items)
                .filter(itemId => itemId != action.itemId)
                .map(itemId => items[itemId])

        case 'ADD_TRANSACTION':
            return {
                ...items,
                [action.itemId]: {
                    ...items[action.itemId],
                    amount: items[action.itemId].amount + action.amount
                }
            }
    }

    return items;
}