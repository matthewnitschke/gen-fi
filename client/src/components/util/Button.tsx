import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.input`
  border: none;
  border-radius: 3px;

  background-color: var(--blue);
  color: #fff;
  outline: none;

  padding: 0.4rem 0.7rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: var(--blue-dark);
  }
`;

export default function Button(props) {
  return <ButtonStyled type="button" {...props} />;
}
