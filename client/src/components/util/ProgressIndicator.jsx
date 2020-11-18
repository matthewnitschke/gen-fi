import React from 'react';

import '../../styles/progress_indicator.scss'

export default function ProgressIndicator({
    value,
    max
}) {
    return <div className="progress-indicator">
        <div className="current" style={{width: `${(value/max)*100}%`}}></div>
        {/* <div className=""></div> */}
    </div>
}