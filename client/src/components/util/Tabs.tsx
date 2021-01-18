import React from 'react';

import styled from 'styled-components';

const TabsStyled = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    text-align: center;
    cursor: pointer;
    font-size: .7rem;
    font-weight: 400;
    padding: 0 .5rem;

    text-transform: uppercase;
    
    &.selected {
      color: var(--purple);
      font-weight: 600;
      text-decoration: underline;
    }

    &:not(:last-child) {
      border-right: solid 1px #000;
    }
  }
`;

type Props = {
  items: Array<string>;

  selectedItem: string;
  onSelectItem: (item: string) => void;
};

export default function Tabs({
  items,

  selectedItem,
  onSelectItem,
}: Props) {
  return (
    <TabsStyled>
      {items.map((tab) => (
        <div
          className={selectedItem == tab ? 'selected' : ''}
          key={tab}
          onClick={() => onSelectItem(tab)}
        >
          {tab}
        </div>
      ))}
    </TabsStyled>
  );
}
