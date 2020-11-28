import { saveBudget } from './thunks.js'

export const updaterMiddleware = store => next => action => {
    next(action);

    if (action.updateDB) {
        store.dispatch(saveBudget(store.getState()));
    }
}