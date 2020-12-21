import React from 'react';
import styled from 'styled-components';

type Props = {
  onDelete?: () => void;
  onClose?: () => void;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 0.7rem;
`;

const DeleteButton = styled.i`
  color: var(--red);
  cursor: pointer;

  &:hover {
    color: var(--red-dark);
  }
`;

const CloseButton = styled.i`
  color: var(--blue);
  cursor: pointer;

  &:hover {
    color: var(--blue-dark);
  }
`;

export default function PanelHeaderToolbar({ onDelete, onClose }: Props) {
  return (
    <Wrapper>
      {onDelete && (
        <DeleteButton
          className="far fa-trash-alt delete-button"
          onClick={onDelete}
        ></DeleteButton>
      )}

      {onClose && (
        <CloseButton
          className="fas fa-times close-button"
          onClick={onClose}
        ></CloseButton>
      )}
    </Wrapper>
  );
}
