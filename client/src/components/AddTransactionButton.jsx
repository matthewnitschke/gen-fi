import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { newTransaction } from '../modules/thunks.js'

import Modal from 'react-modal'

import '../styles/add-transaction-button.scss'
import TextInput from './util/TextInput'

export default function AddTransactionButton() {
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const [merchant, setMerchant] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    function closeModal() {
        setIsOpen(false)

        setMerchant('')
        setAmount('')
        setDate('')
    }

    return (
        <>
            <div
                className="add-transaction-button"
                onClick={() => setIsOpen(true)}
            >
                +
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    content: {
                        margin: 'auto',
                        maxWidth: '30rem',
                        maxHeight: '20rem',
                    },
                }}
            >
                <div className="add-transaction__modal">
                    <div className="add-transaction__modal-body">
                        <h2>Add Transaction</h2>
                        <TextInput
                            placeholder="Merchant"
                            value={merchant}
                            onValueChange={setMerchant}
                            tabIndex="1"
                        />
                        <TextInput
                            placeholder="Amount"
                            value={amount}
                            onValueChange={setAmount}
                            tabIndex="2"
                        />
                        <TextInput
                            placeholder="Date (mm/dd/yyyy)"
                            value={date}
                            onValueChange={setDate}
                            tabIndex="3"
                        />
                    </div>

                    <div className="add-transaction__modal-footer">
                        <input
                            type="button"
                            value="Add"
                            onClick={() => {
                                dispatch(newTransaction(merchant, amount, date))
                                closeModal()
                            }}
                        />
                        <input
                            type="button"
                            value="Cancel"
                            onClick={closeModal}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}
