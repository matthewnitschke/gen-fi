export function addBucket(parentId) {
    return {
        type: 'ADD_BUCKET',
        label: 'Label',
        parentId 
    }
}

export function addBucketGroup() {
    return {
        type: 'ADD_BUCKET_GROUP',
        label: 'Label'
    }
}

export function updateItem(
    itemId,
    item
) {
    return {
        type: 'UPDATE_ITEM',
        itemId,
        item
    }
}

export function deleteItem(itemId) {
    return {
        type: 'DELETE_ITEM',
        itemId
    }
}

export function addTransactionToItem(itemId, amount) {
    return {
        type: 'ADD_TRANSACTION',
        itemId,
        amount
    }
}

export function updateItemValue(itemId, value) {
    return {
        type: 'UPDATE_ITEM_VALUE',
        itemId,
        value
    }
}