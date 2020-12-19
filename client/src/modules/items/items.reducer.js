import { v4 as uuid } from 'uuid';

export function itemsReducer(items = {}, action) {
    switch(action.type) {    

        case 'ADD_BUCKET':
            var newItemId = uuid();

            var updatedItems = {
                ...items,
                [newItemId]: { 
                    label: null,
                    value: { type: 'static', amount: 0 },
                    transactions: [],
                },
            }

            if (action.parentId) {
                updatedItems[action.parentId].items.push(newItemId)
            }

            return updatedItems
            
        case 'ADD_BUCKET_GROUP':
            return {
                ...items,
                [uuid()]: { label: null, items: [] }
            }

        case 'UPDATE_ITEM':
            return {
                ...items,
                [action.itemId]: action.item
            }

        case 'DELETE_ITEM':
            let isGroup = items[action.itemId].hasOwnProperty('items')

            return Object.keys(items)
                .filter(itemId => itemId != action.itemId)
                .filter(itemId => {
                    // if the item we are deleting is a group, also remove the items 
                    // nested within the group
                    if (isGroup) {
                        return !items[action.itemId].items.includes(itemId)
                    }
                    return true;
                })
                .reduce((accumulator, itemId) => {
                    let item = items[itemId];
                    
                    // if the itemId shows up as a subItem in a group, we need to delete it there as well
                    if (item.items) {
                        item.items = item.items.filter(subItemId => subItemId != action.itemId)
                    }

                    accumulator[itemId] = item;

                    return accumulator;
                }, {})

        case 'ADD_TRANSACTION_TO_ITEM':
            return {
                ...items,
                [action.itemId]: {
                    ...items[action.itemId],
                    transactions: [
                        ...items[action.itemId].transactions ?? [], 
                        action.transactionId
                    ]
                }
            }
    }

    return items;
}