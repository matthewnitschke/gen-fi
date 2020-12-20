import { v4 as uuid } from 'uuid'

export function borrowsReducer(borrows = {}, action) {
    switch (action.type) {
        case 'ADD_BORROW':
            return {
                ...borrows,
                [uuid()]: {
                    toId: action.toId,
                    fromId: action.fromId,
                    amount: action.amount,
                },
            }
    }

    return borrows
}
