// import React from 'react';
// import InputTable from '../util/InputTable';
// import { useSelector, useDispatch } from 'react-redux';
// import { hasExtraItemTypeSelectorFactory } from '../../modules/items/items.selectors';
// import { updateItem } from '../../modules/items/items.actions';
// import { AppState, Bucket, ItemValueType } from '../../redux/state';

// interface ItemValueEditorProps {
//   itemId: string
// }

// export default function ItemValueEditor({ itemId }: ItemValueEditorProps) {
//   const item = useSelector(
//     (state: AppState) => state.items.get(itemId)!
//   ) as Bucket; // only buckets should be having their values edited
  
//   const doesExtraBucketAlreadyExist = useSelector(
//     hasExtraItemTypeSelectorFactory()
//     );
    
//     const dispatch = useDispatch();

//   function onValueTypeChange(e) {
//     dispatch(
//       updateItem(itemId, {
//         ...item,
//         value: { ...item.value, type: e.target.value },
//       })
//     );
//   }

//   return (
//     <>
//       <div>
//         <h2>Type</h2>
//         <div>
//           <input
//             type="radio"
//             name="value-type"
//             value="income"
//             onChange={onValueTypeChange}
//             checked={item.value.type == ItemValueType.income}
//           />
//           <label>Income</label>
//         </div>
//         <div>
//           <input
//             type="radio"
//             name="value-type"
//             value="static"
//             onChange={onValueTypeChange}
//             checked={item.value.type == ItemValueType.static}
//           />
//           <label>Value</label>
//         </div>
//         <div>
//           <input
//             type="radio"
//             name="value-type"
//             value="table"
//             onChange={onValueTypeChange}
//             checked={item.value.type == ItemValueType.table}
//           />
//           <label>Table</label>
//         </div>
//         <div>
//           <input
//             type="radio"
//             name="value-type"
//             value="extra"
//             onChange={onValueTypeChange}
//             checked={item.value.type == ItemValueType.extra}
//             disabled={doesExtraBucketAlreadyExist}
//           />
//           <label>Extra</label>
//         </div>
//       </div>
//       <div>
//         <h2>Value</h2>
//         {(item.value.type == ItemValueType.static || item.value.type == ItemValueType.income) && (
//           <input
//             type="number"
//             defaultValue={item.value.amount}
//             onBlur={(e) => {
//               dispatch(
//                 updateItem(itemId, {
//                   ...item,
//                   value: {
//                     ...item.value,
//                     amount: parseInt(e.target.value),
//                   },
//                 })
//               );
//             }}
//           />
//         )}

//         {item.value.type == 'table' && (
//           <InputTable
//             rows={item.value.rows}
//             onChange={(newRows) =>
//               dispatch(
//                 updateItem(itemId, {
//                   ...item,
//                   value: { ...item.value, rows: newRows },
//                 })
//               )
//             }
//           />
//         )}

//         {item.value.type == 'extra' && <div>Calculated from other buckets</div>}
//       </div>
//     </>
//   );
// }
