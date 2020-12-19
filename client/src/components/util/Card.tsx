import React, {forwardRef, ReactNode} from 'react';

import '../../styles/card.scss';

type Props = {
    children: ReactNode;
    className?: String;
    skin?: String;
}

export type Ref = HTMLDivElement;

const Card = forwardRef<Ref, Props>((props, ref) => {
    return <div
        ref={ref}
        className={`card ${props.skin ? 'skin-' + props.skin : ''} ${props.className}`}
    >
        {props.children}
    </div>
});

export default Card;