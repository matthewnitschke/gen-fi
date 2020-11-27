export const updatorMiddlware = storeAPI => next => action => {
    if (action.updateDB) {
        store
    }

    return next(action)
}