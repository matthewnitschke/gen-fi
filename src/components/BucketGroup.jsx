import React from 'react';

export default function BucketGroup(props) {
    return <div className="bucket-group">
        <div className="label">{props.label}</div>
        <div>
            {props.children}
        </div>
    </div>
}