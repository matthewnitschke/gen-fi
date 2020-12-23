import { saveBudget } from './thunks';

export const updaterMiddleware = (store) => (next) => (action) => {
  next(action);

  if (action.updateDB) {
    console.log('Running updateDB');
    store.dispatch(saveBudget(store.getState()));
  }
};
