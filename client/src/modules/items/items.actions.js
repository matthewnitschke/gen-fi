export function addBucket(parentId) {
    return {
        type: 'ADD_BUCKET',
        label: 'Label',
        parentId,
        updateDB: true,
    }
}

export function addBucketGroup() {
    return {
        type: 'ADD_BUCKET_GROUP',
        label: 'Label',
        updateDB: true
    }
}

export function updateItem(
    itemId,
    item
) {
    return {
        type: 'UPDATE_ITEM',
        itemId,
        item,
        updateDB: true
    }
}

export function deleteItem(itemId) {
    return {
        type: 'DELETE_ITEM',
        itemId,
        updateDB: true
    }
}

export function addTransactionToItem(itemId, transactionId) {
    return {
        type: 'ADD_TRANSACTION_TO_ITEM',
        itemId,
        transactionId,
        updateDB: true
    }
}

export function updateItemValue(itemId, value) {
    return {
        type: 'UPDATE_ITEM_VALUE',
        itemId,
        value,
        updateDB: true
    }
}