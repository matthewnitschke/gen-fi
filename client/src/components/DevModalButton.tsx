import React, { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { AppState } from '../redux/state';

import { resetBudget, logout, deleteAllTransactions, syncTransactions } from '../modules/thunks';
import Modal from 'react-modal';
import Tabs from './util/Tabs';
import { serverUrl } from '../constants';

export default function DevModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Actions');

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <i className="fas fa-code" onClick={() => setIsOpen(true)}></i>

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
        <Tabs
          items={['Actions', 'Plaid']}
          selectedItem={selectedTab}
          onSelectItem={setSelectedTab}
        />

        { selectedTab == 'Actions' &&
          <_ActionsPanel />
        }

        { selectedTab == 'Plaid' &&
          <_PlaidPanel />
        }

       
      </Modal>
    </div>
  );
}

function _ActionsPanel(props) {
  const dispatch = useDispatch();
  const store = useStore<AppState>();

  return <div>
    <h2>Dev Panel</h2>
    <button onClick={() => dispatch(resetBudget(store.getState()))}>
      Reset Current Budget
    </button>
    <button onClick={() => dispatch(logout())}>Logout</button>
    <button onClick={() => dispatch(deleteAllTransactions())}>Delete My Transactions</button>
    <button onClick={() => dispatch(syncTransactions())}>Sync My Transactions</button>
  </div>
}

function _PlaidPanel(props) {
  const [accounts, setAccounts] = useState([]);

  const [email, setEmail] = useState('')

  function getAccounts() {
    fetch(`${serverUrl}/plaid/accounts?email=${email}`)
      .then(resp => resp.json())
      .then(accounts => setAccounts(accounts));
  }

  return <div>
    <h2>Plaid</h2>

    <form
      onSubmit={e => {
        e.preventDefault();
        getAccounts();
      }}

      style={{textAlign: 'center'}}
    >
      <input 
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email"
        style={{marginRight: '3px'}} />

      <input 
        type="submit"
        value=">" />
    </form>


    <table
      style={{margin: 'auto'}}
    >
      <thead>
        <tr>
          <th>Email</th>
          <th>Access Token</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map(account => {
          return <tr key={account._id}>
            <td>{account.email}</td>
            <td>
              <a style={{color: 'blue', cursor: 'pointer'}} onClick={() => {
                let token = window.prompt('Enter access token.');
                if (token != null && token != '') {
                  fetch(`${serverUrl}/plaid/setAccessToken`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: account.email,
                      token
                    })
                  }).then(getAccounts);
                }
              }}>
                {account.plaidAccessToken ?? 'Set'}
              </a>
            </td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}