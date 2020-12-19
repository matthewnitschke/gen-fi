import { itemBorrowsSelectorFactory } from '../../../src/modules/borrows/borrows.selectors.js';

describe('borrows selectors', () => {
    it.skip('should return an items borrows', () => {
        let itemKey = 'a';
        let state = {
            borrows: {
                'b_a': { toId: itemKey, fromId: 'b', amount: 1 },
                'b_b': { toId: itemKey, fromId: 'b', amount: 2 },
                'b_c': { toId: 'z', fromId: itemKey, amount: 3 },
                'b_d': { toId: itemKey, fromId: 'f', amount: 4 },
                'b_e': { toId: 'x', fromId: 'z', amount: 5 },
            }
        }
        
        let borrows = itemBorrowsSelectorFactory(itemKey)(state)

        expect(borrows).toEqual({
            to: [state.borrows['b_a'], state.borrows['b_b'], state.borrows['b_d']],
            from: [state.borrows['b_c']]
        })
    }, )
})