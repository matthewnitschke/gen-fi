export function addBucket(parentId) {
    return {
        type: 'ADD_BUCKET',
        label: 'Label',
        parentId: parentId 
    }
}

export function addBucketGroup() {
    return {
        type: 'ADD_BUCKET_GROUP',
        label: 'Label'
    }
}

export function selectBucket(itemId) {
    return {
        type: 'SELECT_BUCKET',
        itemId: itemId
    }
}