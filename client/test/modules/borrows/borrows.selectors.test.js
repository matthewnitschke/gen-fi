import { itemBorrowsSelectorFactory } from '../../../src/modules/borrows/borrows.selectors.js'

describe('borrows selectors', () => {
    it('should return an items borrows', () => {
        let itemKey = 'a'
        let state = {
            borrows: {
                b_a: { toId: itemKey, fromId: 'b', amount: 1 },
                b_b: { toId: itemKey, fromId: 'b', amount: 2 },
                b_c: { toId: 'z', fromId: itemKey, amount: 3 },
                b_d: { toId: itemKey, fromId: 'f', amount: 4 },
                b_e: { toId: 'x', fromId: 'z', amount: 5 },
            },
        }

        let borrows = itemBorrowsSelectorFactory(itemKey)(state)

        // itemBorrowsSelector takes the item key, and returns additions/subtractions
        // with a "target" id. This contextualizes how the borrow is oriented. This method
        // converts a state borrow format into the contextualized format
        const convert = (borrow) => ({
            target: borrow.toId == itemKey ? borrow.fromId : borrow.toId,
            amount: borrow.amount,
        })

        expect(borrows).toEqual({
            additions: [
                convert(state.borrows['b_a']),
                convert(state.borrows['b_b']),
                convert(state.borrows['b_d']),
            ],
            subtractions: [convert(state.borrows['b_c'])],
        })
    })
})
