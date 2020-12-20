import { v4 as uuid } from 'uuid';

export function addBucket(
    parentId,
    itemId = uuid()
) {
    return {
        type: 'ADD_BUCKET',
        itemId,
        label: 'Label',
        parentId,
        updateDB: true,
    }
}

export function addBucketGroup(
    itemId = uuid()
) {
    return {
        type: 'ADD_BUCKET_GROUP',
        itemId,
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