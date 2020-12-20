import React from 'react';
import InputTable from '../util/InputTable';
import { useSelector, useDispatch } from 'react-redux';
import { hasExtraItemTypeSelectorFactory } from '../../modules/items/items.selectors.js';
import { updateItem } from '../../modules/items/items.actions.js';
import { AppState } from '../../redux/state';

export default function ItemValueEditor({ itemId }) {
  const item = useSelector((state: AppState) => state.items[itemId]);

  const doesExtraBucketAlreadyExist = useSelector(
    hasExtraItemTypeSelectorFactory()
  );

  const dispatch = useDispatch();

  function onValueTypeChange(e) {
    dispatch(
      updateItem(itemId, {
        ...item,
        value: { ...item.value, type: e.target.value },
      })
    );
  }

  return (
    <>
      <div>
        <h2>Type</h2>
        <div>
          <input
            type="radio"
            name="value-type"
            value="income"
            onChange={onValueTypeChange}
            checked={item.value.type == 'income'}
          />
          <label>Income</label>
        </div>
        <div>
          <input
            type="radio"
            name="value-type"
            value="static"
            onChange={onValueTypeChange}
            checked={item.value.type == 'static'}
          />
          <label>Value</label>
        </div>
        <div>
          <input
            type="radio"
            name="value-type"
            value="table"
            onChange={onValueTypeChange}
            checked={item.value.type == 'table'}
          />
          <label>Table</label>
        </div>
        <div>
          <input
            type="radio"
            name="value-type"
            value="extra"
            onChange={onValueTypeChange}
            checked={item.value.type == 'extra'}
            disabled={doesExtraBucketAlreadyExist}
          />
          <label>Extra</label>
        </div>
      </div>
      <div>
        <h2>Value</h2>
        {(item.value.type == 'static' || item.value.type == 'income') && (
          <input
            type="number"
            defaultValue={item.value.amount}
            onBlur={(e) => {
              dispatch(
                updateItem(itemId, {
                  ...item,
                  value: {
                    ...item.value,
                    amount: parseInt(e.target.value),
                  },
                })
              );
            }}
          />
        )}

        {item.value.type == 'table' && (
          <InputTable
            rows={item.value.rows}
            onChange={(newRows) =>
              dispatch(
                updateItem(itemId, {
                  ...item,
                  value: { ...item.value, rows: newRows },
                })
              )
            }
          />
        )}

        {item.value.type == 'extra' && <div>Calculated from other buckets</div>}
      </div>
    </>
  );
}
