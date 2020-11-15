import React from 'react';
import { connect } from 'react-redux';

import { useDrop } from 'react-dnd';

import '../styles/bucket.scss';
import TextInput from './util/TextInput';

function Bucket({
    label,
    amount
}) {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'transaction',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return <div 
        ref={drop}
        className={`bucket ${isOver ? 'transaction-hovered' : ''}`}
    >
        <div className="label">
            <TextInput 
                value={label} 
            />
        </div>
        <div>
            <TextInput 
                value={`$${amount}`}
            />
        </div>
    </div>
}

// const mapStateToProps = function(state) {
//     return {
//         items: state.items
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateSettings: () => {
            dispatch(updateItem('Bucket'));
        }
    }
}

export default connect(null, mapDispatchToProps)(Bucket);