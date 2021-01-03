import React, { useState } from 'react';
import styled from 'styled-components';

const TextInputStyled = styled.div`
  border-radius: 4px;
  border: 1px solid transparent;
  padding: 0.3rem;
  margin: 0.2rem 0;

  &:hover:not(.editing) {
    border-color: var(--background);
    background-color: var(--background);
  }

  &.editing {
    border-color: var(--blue-dark);
  }

  input {
    width: 100%;
    outline: none;
    border: none;
  }
`;

type Props = {
  value: string;
  placeholder: string;
  type?: string,
  tabIndex?: number;

  onValueChange: (newValue: string) => void;
};

export default function TextInput(props: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [internalValue, setInternalValue] = useState(props.value);

  function commitValue() {
    setIsEditing(false);

    !!props.onValueChange && props.onValueChange(internalValue);
  }

  return (
    <TextInputStyled className={isEditing ? 'editing' : ''}>
      {isEditing && (
        <input
          type={props.type ?? "text"}
          value={internalValue}
          placeholder={props.placeholder}
          onChange={(e) => setInternalValue(e.target.value)}
          autoFocus={true}
          onBlur={commitValue}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              commitValue();
            }
          }}
        />
      )}

      {!isEditing && (
        <div
          onClick={() => setIsEditing(true)}
          onFocus={() => setIsEditing(true)}
          tabIndex={props.tabIndex}
        >
          {!internalValue ? props.placeholder : internalValue}
        </div>
      )}
    </TextInputStyled>
  );
}
