import { saveBudget } from './thunks.js'

export const updaterMiddleware = (store) => (next) => (action) => {
    console.log(action)
    next(action)

    if (action.updateDB) {
        console.log('Running updateDB')
        store.dispatch(saveBudget(store.getState()))
    }
}
