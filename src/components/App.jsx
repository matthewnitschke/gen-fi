import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { connect } from 'react-redux';

import BucketGroup from './BucketGroup.jsx';
import Bucket from './Bucket.jsx';
import Transactions from './Transactions.jsx';

import { addItem } from '../modules/items/items.actions.js';

import '../styles/app.scss';

function App({
    items,

    onAddBucket
}) {
    return <div>
        <DndProvider backend={HTML5Backend}>

            {items.map((item) => {
                if (item.type == 'group') {
                    return <BucketGroup label={item.label} />
                }
                
                return <Bucket label={item.label} amount={item.amount} />
            })}

            <Transactions />
        </DndProvider>
    </div>
}

const mapStateToProps = function(state) {
    return {
        items: state.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddBucket: () => {
            dispatch(addBucket());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);