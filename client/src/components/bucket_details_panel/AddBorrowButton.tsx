import React, { useState } from 'react'
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { addBorrow } from '../../modules/borrows/borrows.actions';
import { bucketItemsSelectorFactory } from '../../modules/items/items.selectors';

export default function AddBorrowButton() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const buckets = useSelector(bucketItemsSelectorFactory());

    const [toId, setToId] = useState<string>();
    const [fromId, setFromId] = useState<string>();
    const [amount, setAmount] = useState<number>();

    function closeModal() {
        setIsOpen(false);
    }

    return <>
        <input 
            type="button" 
            value="Add Borrow" 
            onClick={() => setIsOpen(true)} />

        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={{
                content: {
                    margin: 'auto',
                    maxWidth: '30rem',
                    maxHeight: '20rem',
                }
            }}
        >
            <div>
                <label htmlFor="fromId">From</label>
                <select 
                    id="fromId" 
                    value={fromId}
                    onChange={e => setFromId(e.target.value)}
                >
                    <option disabled>Select</option>
                    {buckets.map((bucket) => <option value={bucket.id}>{bucket.label}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="toId">To</label>
                <select 
                    id="toId"
                    value={toId}
                    onChange={e => setToId(e.target.value)}
                >
                    <option disabled>Select</option>
                    {buckets.map((bucket) => <option value={bucket.id}>{bucket.label}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="amount">Amount</label>
                <input 
                    id="amount" 
                    type="text"
                    value={amount}
                    onChange={e => setAmount(parseFloat(e.target.value))}
                />
            </div>

            <input type="button" value="Create" onClick={() => dispatch(addBorrow(toId, fromId, amount))}/>
        </Modal>
    </>
}