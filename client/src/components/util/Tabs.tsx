import React from 'react';

import styled from 'styled-components';

const TabsStyled = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    width: 4rem;
    margin: 0 0.5rem;
    text-align: center;
    cursor: pointer;

    &.selected {
      font-weight: 600;
      text-decoration: underline;
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
