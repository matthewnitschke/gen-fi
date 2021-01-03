import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { newTransaction } from '../modules/thunks';

import Modal from 'react-modal';

import TextInput from './util/TextInput';
import { modalStyles } from '../constants';
import styled from 'styled-components';

const TransactionButton = styled.div`
  border-radius: 100%;
  background-color: rgb(223, 154, 26);
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #fff;

  position: fixed;
  left: 1rem;
  bottom: 1rem;

  cursor: pointer;

  &:hover {
    background-color: rgb(179, 134, 53);
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  &:first-child { // modal body
    height: 100%;
  }
`

export default function AddTransactionButton() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  function closeModal() {
    setIsOpen(false);

    setMerchant('');
    setAmount('');
    setDate('');
  }

  return (
    <>
      <TransactionButton onClick={() => setIsOpen(true)}>
        +
      </TransactionButton>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={modalStyles}
      >
        <ModalContent>
          <div>
            <h2>Add Transaction</h2>
            <TextInput
              placeholder="Merchant"
              value={merchant}
              onValueChange={setMerchant}
              tabIndex={1}
            />
            <TextInput
              placeholder="Amount"
              value={amount}
              onValueChange={setAmount}
              tabIndex={2}
            />
            <TextInput
              placeholder="Date (mm/dd/yyyy)"
              value={date}
              onValueChange={setDate}
              tabIndex={3}
            />
          </div>

          <div>
            <input
              type="button"
              value="Add"
              onClick={() => {
                dispatch(newTransaction(merchant, amount, date));
                closeModal();
              }}
            />
            <input type="button" value="Cancel" onClick={closeModal} />
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
