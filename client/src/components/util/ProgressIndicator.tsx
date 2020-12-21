import React from 'react';
import styled from 'styled-components';

// import '../../styles/progress_indicator.scss';

type Props = {
  // current value of the indicator
  value: number;

  // maximum value of the indicator
  max: number;
};

const ProgressIndicatorStyled = styled.div`
  background-color: lightgrey;
  height: 2px;
  overflow: hidden;

  & .current {
    background-color: ${({ value, max }) =>
      value > max ? '#e64b40' : '#62ce66'};
    height: 2px;
    transition: width 0.5s;
  }
`;

export default function ProgressIndicator({ value, max }: Props) {
  return (
    <ProgressIndicatorStyled className="progress-indicator">
      {!(value == 0 && max == 0) && (
        <div
          className="current"
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      )}
    </ProgressIndicatorStyled>
  );
}
