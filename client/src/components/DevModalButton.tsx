import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { AppState } from '../redux/state';

import { resetBudget } from '../modules/thunks';
import Modal from 'react-modal';

export default function DevModalButton() {
  const dispatch = useDispatch();
  const store = useStore<AppState>();

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <input type="button" value="Dev" onClick={() => setIsOpen(true)} />

      <Modal
        isOpen={isOpen}
        onRequestHide={closeModal}
        ariaHideApp={false}
        style={{
          content: {
            margin: 'auto',
            maxWidth: '30rem',
            maxHeight: '20rem',
          },
        }}
      >
        <h2>Dev Panel</h2>
        <button onClick={() => dispatch(resetBudget(store.getState()))}>
          Reset Current Budget
        </button>
      </Modal>
    </div>
  );
}
