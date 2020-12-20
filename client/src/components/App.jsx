import React, { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { loadBudget } from '../modules/thunks.js'
import { reorderRootItemIds } from '../modules/root/root.actions.js'

import BucketGroup from './BucketGroup'
import Bucket from './Bucket'
import Transactions from './Transactions'
import Card from './util/Card'
import RootNewButton from './RootNewButton'
import BucketDetailsPanel from './bucket_details_panel/BucketDetailsPanel'
import BucketGroupDetailsPanel from './BucketGroupDetailsPanel'
import DevModalButton from './DevModalButton'

import '../styles/app.scss'
import MonthSelector from './MonthSelector.jsx'
import TransactionDetailsPanel from './TransactionDetailsPanel.jsx'

export default function App() {
    const dispatch = useDispatch()

    const items = useSelector((state) => state.items)
    const rootItemIds = useSelector((state) => state.rootItemIds)

    const selectedTransactionId = useSelector(
        (state) => state.selectedTransactionId
    )
    const selectedMonth = useSelector((state) => state.selectedMonth)

    const selectedItemId = useSelector((state) => state.selectedItemId)
    const isSelectedItemAGroup =
        useSelector(
            (state) => state.items[state.selectedItemId]
        )?.hasOwnProperty('items') == true

    useEffect(() => {
        dispatch(loadBudget(selectedMonth))
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <DevModalButton />
            </div>
            <div className="main-content">
                <MonthSelector />
                {rootItemIds.map((itemId, i) => {
                    let isGroup = items[itemId].hasOwnProperty('items')

                    return (
                        <Card
                            key={itemId}
                            isReorderable={true}
                            index={i}
                            moveCard={(dragIndex, hoverIndex) => {
                                let dragItemId = rootItemIds[dragIndex]
                                dispatch(
                                    reorderRootItemIds(
                                        dragItemId,
                                        dragIndex,
                                        hoverIndex
                                    )
                                )
                            }}
                        >
                            {isGroup && <BucketGroup itemId={itemId} />}
                            {!isGroup && <Bucket itemId={itemId} />}
                        </Card>
                    )
                })}

                <RootNewButton />
            </div>

            <div className="rhp">
                {/* <div>
                <BankAccountsButton />
            </div> */}
                {selectedItemId && !isSelectedItemAGroup && (
                    <BucketDetailsPanel itemId={selectedItemId} />
                )}
                {selectedItemId && isSelectedItemAGroup && (
                    <BucketGroupDetailsPanel itemId={selectedItemId} />
                )}

                {selectedTransactionId && (
                    <TransactionDetailsPanel
                        transactionId={selectedTransactionId}
                    />
                )}
            </div>

            <Transactions />
        </DndProvider>
    )
}
