import { loadBudget as loadBudgetAction } from './root/root.actions.js'

export const loadBudget = date => {
    return (dispatch) => {
        fetch(`http://localhost:8000/budget/${date.toISOString()}`)
            .then(resp => resp.json())
            .then(data => {
                dispatch(loadBudgetAction(data))
            });

    }
  }