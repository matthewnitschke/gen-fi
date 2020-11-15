export function items(state, action) {
    switch(action.type) {
        case 'ADD_BUCKET':
            return Object.assign({}, state, {
                items: [
                    ...state.items,
                    { label: action.label, amount: 0, maxAmount: 0 }
                ]
            });
        
        case 'ADD_BUCKET_GROUP':
            return Object.assign({}, state, {
                items: [
                    ...state.items,
                    { label: action.label, type: 'group' }
                ]
            })
    }

    return state;
}