import { v4 as uuid } from 'uuid';

export function items(state, action) {
    switch(action.type) {    

        case 'ADD_BUCKET':
            var newBucket = { id: uuid(), label: action.label, amount: 0, maxAmount: 0 }

            var updatedItems = [ ...state.items ]

            if (action.parentId) {
                updatedItems = updatedItems.map(item => {
                    if (item.id == action.parentId) {
                        item.items.push(newBucket)
                    }
                    return item
                })
            } else {
                updatedItems.push(newBucket)
            }

            return {
                ...state,
                items: updatedItems
            }
            
        case 'ADD_BUCKET_GROUP':
            return {
                ...state,
                items: [
                    ...state.items,
                    { id: uuid(), label: action.label }
                ],
            }

        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id == action.itemId) {
                        return {...item, label: action.label };
                    }
                    return item;
                })
            }

        case 'SELECT_ITEM':
            return {
                ...state,
                selectedItemId: action.itemId
            }
        
        case 'DELETE_ITEM':
            return {
                ...state,
                selectedItemId: null,
                items: state.items.filter(item => item.id != action.itemId)
            }

        case 'ADD_TRANSACTION':
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id == action.itemId) {
                        return {...item, amount: item.amount + action.amount}
                    }

                    if (item.items && item.items.some(i => i.id === action.itemId)) {
                        return {
                            ...item,
                            items: item.items.map(subItem => {
                                if (subItem.id == action.itemId) {
                                    return {
                                        ...subItem,
                                        amount: item.amount + action.amount
                                    }
                                }
                                return subItem;
                            })
                        }
                    }

                    return item
                })
            }
    }

    return state;
}