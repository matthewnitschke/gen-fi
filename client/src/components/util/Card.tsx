import React, { forwardRef, ReactNode, useRef } from 'react'
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd'

import { updateDB } from '../../modules/root/root.actions'

import '../../styles/card.scss'
import { useDispatch } from 'react-redux'

type Props = {
    className?: string
    skin?: string
    isReorderable?: boolean
    index?: number

    moveCard?: (dragIndex: number, hoverIndex: number) => void

    children: ReactNode
}

interface DragItem {
    index: number
    id: string
    type: string
}

export default function Card(props: Props) {
    const ref = useRef<HTMLDivElement>()

    const dispatch = useDispatch()

    const [, drop] = useDrop({
        accept: 'item',
        hover: (item: DragItem, monitor: DropTargetMonitor) => {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = props.index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            props.moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
        drop: () => {
            dispatch(updateDB())
        },
    })

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'item', index: props.index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    if (props.isReorderable) {
        drag(drop(ref))
    }

    return (
        <div
            ref={ref}
            className={`card ${props.skin ? 'skin-' + props.skin : ''} ${
                props.className
            }`}
            style={{ opacity: isDragging ? 0 : 1 }}
        >
            {props.children}
        </div>
    )
}
