import React from 'react';
import { connect } from 'react-redux';

import {addBucket} from '../modules/items/items.actions.js'

function BucketGroup(props) {
    return <div className="bucket-group">
        <div className="label">{props.label}</div>
        <div>
            {props.children}
        </div>
        <div>
            <a className="link" onClick={props.onAddBucket}>Add Item</a>
        </div>
    </div>
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddBucket: () => {
            dispatch(addBucket());
        }
    }
}

export default connect(null, mapDispatchToProps)(BucketGroup);