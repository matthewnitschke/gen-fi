import {
  itemValueSelectorFactory,
  rootItemsSelectorFactory,
} from '../../../src/modules/items/items.selectors';

describe('items selectors', () => {
  describe('itemValueSelector', () => {
    it('static value type', () => {
      let itemKey = 'a';
      let state = {
        items: {
          [itemKey]: { value: { type: 'static', amount: 9 } },
        },
        borrows: {},
      };

      let value = itemValueSelectorFactory(itemKey)(state);

      expect(value).toEqual(9);
    });

    it('income value type', () => {
      let itemKey = 'a';
      let state = {
        items: {
          [itemKey]: { value: { type: 'income', amount: 9 } },
        },
        borrows: {},
      };

      let value = itemValueSelectorFactory(itemKey)(state);

      expect(value).toEqual(9);
    });

    it('table value type', () => {
      let itemKey = 'a';
      let state = {
        items: {
          [itemKey]: {
            value: {
              type: 'table',
              rows: [
                { label: 'hey', amount: 2 },
                { label: 'hey 2', amount: 1.2 },
                { label: 'hey 3', amount: 1 },
              ],
            },
          },
        },
        borrows: {},
      };

      let value = itemValueSelectorFactory(itemKey)(state);

      expect(value).toEqual(4.2);
    });

    it('table value type with null rows', () => {
      let itemKey = 'a';
      let state = {
        items: {
          [itemKey]: { value: { type: 'table' } },
        },
        borrows: {},
      };

      let value = itemValueSelectorFactory(itemKey)(state);

      expect(value).toEqual(0);
    });

    it('extra value type', () => {
      let itemKey = 'a';
      let state = {
        items: {
          [itemKey]: { value: { type: 'extra' } },
          income1: { value: { type: 'income', amount: 53 } },
          income2: { value: { type: 'income', amount: 22 } },
          table: {
            value: {
              type: 'table',
              rows: [
                { label: 'a', amount: 4 },
                { label: 'b', amount: 2 },
              ],
            },
          },
          static: { value: { type: 'static', amount: 9 } },
        },
        borrows: {},
      };

      let value = itemValueSelectorFactory(itemKey)(state);

      expect(value).toEqual(60);
    });

    it('unknown value type', () => {
      let itemKey = 'a';
      let state = {
        items: {
          [itemKey]: { value: { type: 'boogabooga' } },
        },
        borrows: {},
      };

      let value = itemValueSelectorFactory(itemKey)(state);

      expect(value).toEqual(0);
    });

    it('with borrows', () => {
      let itemKey1 = 'a';
      let itemKey2 = 'b';
      let state = {
        items: {
          [itemKey1]: { value: { type: 'static', amount: 10 } },
          [itemKey2]: { value: { type: 'static', amount: 10 } },
        },
        borrows: {
          c: { fromId: itemKey1, toId: itemKey2, amount: 3 },
          d: { fromId: itemKey1, toId: itemKey2, amount: 5 },
          e: { fromId: itemKey2, toId: itemKey1, amount: 2 },
        },
      };

      let value1 = itemValueSelectorFactory(itemKey1)(state);
      let value2 = itemValueSelectorFactory(itemKey2)(state);

      expect(value1).toEqual(4);
      expect(value2).toEqual(16);
    });
  });
});
