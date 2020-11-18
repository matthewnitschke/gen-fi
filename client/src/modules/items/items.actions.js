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

export function selectItem(itemId) {
    return {
        type: 'SELECT_ITEM',
        itemId
    }
}

export function updateItem(
    itemId,
    label,
    amount
) {
    return {
        type: 'UPDATE_ITEM',
        itemId,
        label,
        amount
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