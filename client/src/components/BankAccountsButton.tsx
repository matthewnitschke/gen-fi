import React, { useEffect, useState } from 'react';
import Button from './util/Button';

import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { modalStyles, serverUrl } from '../constants';

export default function BankAccountsButton() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    try {
      fetch(`${serverUrl}/plaid/getBankAccounts`)
      .then(resp => resp.json())
      .then(resp => setAccounts(resp.accounts ?? []))
      .catch(console.error)
    } catch (e) {
      console.error(e);
    }
  }, [])


  return (
    <>
      <i className="fas fa-university" onClick={() => setIsOpen(true)}></i>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyles}
        ariaHideApp={false}
      >
        {accounts.map(account => {
          let amount = parseFloat(account.balances.available ?? account.balances.current).toFixed(2);
          return <div>
            {account.name} - ${amount} 
            <input type="checkbox" />
          </div>
        })}
      </Modal>
    </>
  );
}