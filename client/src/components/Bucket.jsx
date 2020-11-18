import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect'

import { useDrop } from 'react-dnd';

import { selectItem, updateItem } from '../modules/items/items.actions.js';

import {flatItemsSelector} from '../selectors.js';

import { getItem } from '../utils.js';

import TextInput from './util/TextInput';
import '../styles/bucket.scss';
import ProgressIndicator from './util/ProgressIndicator.jsx';

export default function Bucket(props) {
    const dispatch = useDispatch()
    const item = useSelector(
        state => flatItemsSelector(state)[props.itemId],
    )

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'transaction',
        drop: () => ({ itemId: props.itemId }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return <div 
        ref={drop}
        className={`bucket ${isOver ? 'transaction-hovered' : ''}`}
        className="bucket"
        onClick={() => dispatch(selectItem(props.itemId))}
    >
        <div className="label">
            <TextInput
                value={item.label} 
                onValueChange={(v) => dispatch(updateItem(props.itemId, v, item.amount))}
            />
        </div>
        <div className="max-amount">
            <TextInput 
                value={`$${item.maxAmount}`}
            />
        </div>

        <div className="amount-slider">
            <ProgressIndicator value={item.amount} max={item.maxAmount}/>
        </div>

    </div>
}

// const mapStateToProps = function(state) {
//     return {
//         items: state.items
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onUpdateSettings: () => {
//             dispatch(updateItem('Bucket'));
//         }
//     }
// }

// export default connect(null, mapDispatchToProps)(Bucket);