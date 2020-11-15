import React from 'react';

import '../../styles/card.scss';

const Card = React.forwardRef((props, ref) => {
    return <div
        ref={ref}
        className={`card ${props.skin ? 'skin-' + props.skin : ''} ${props.className}`}
    >
        {props.children}
    </div>
});

export default Card;