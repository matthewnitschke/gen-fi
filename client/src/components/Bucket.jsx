import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useDrop } from 'react-dnd';

import { selectBucket, updateItem } from '../modules/items/items.actions.js';

import { getItem } from '../utils.js';

import TextInput from './util/TextInput';
import '../styles/bucket.scss';

export default function Bucket(props) {
    const item = useSelector(state => state.items[props.itemId])

    const dispatch = useDispatch()

    // const [{ canDrop, isOver }, drop] = useDrop({
    //     accept: 'transaction',
    //     drop: () => ({ name: 'Dustbin' }),
    //     collect: (monitor) => ({
    //         isOver: monitor.isOver(),
    //         canDrop: monitor.canDrop(),
    //     }),
    // });

    return <div 
        // ref={drop}
        // className={`bucket ${isOver ? 'transaction-hovered' : ''}`}
        className="bucket"
        onClick={() => dispatch(selectBucket(props.itemId))}
    >
        <div className="label">
            <TextInput
                value={item.label} 
                onValueChange={(v) => dispatch(updateItem(props.itemId, v, item.amount))}
            />
        </div>
        <div>
            <TextInput 
                value={`$${item.amount}`}
            />
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