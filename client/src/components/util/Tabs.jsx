import React from 'react';

import '../../styles/tabs.scss';

// export default function TabView({
//     headers
// }) {
//     return <div className="tab-view">
//         <div className="header">
//             {headers.map(header => <div>
//                 {header}
//             </div>)}
//         </div>
//     </div>
// }

export default function Tabs({
    items,

    selectedItem,
    onSelectItem
}) {
    return <div className="tabs">
        {items.map(tab => 
            <div 
                className={`tab ${selectedItem == tab ? 'selected' : ''}`}
                key={tab}
                onClick={() => onSelectItem(tab)}
            >{tab}</div>
        )}
    </div>
}