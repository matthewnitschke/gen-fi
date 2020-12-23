import React, { useState } from 'react';
import Button from './util/Button';

import Modal from 'react-modal';

export default function BankAccountsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <i className="fas fa-university" onClick={() => setIsOpen(true)}></i>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          content: {
            margin: 'auto',
            maxWidth: '30rem',
            maxHeight: '20rem',
          },
        }}
      >
        <div>Checking - $1234</div>

        <Button value="Add" />
      </Modal>
    </>
  );
}
