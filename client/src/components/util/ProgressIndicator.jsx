import React from 'react';

import '../../styles/progress_indicator.scss';

export default function ProgressIndicator({ value, max }) {
  console.log(':: ' + value + ':' + max);

  return (
    <div className={`progress-indicator ${value > max ? 'full' : ''}`}>
      <div
        className="current"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  );
}
