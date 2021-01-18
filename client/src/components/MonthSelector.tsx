import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { format, add } from 'date-fns';

import '../styles/month-selector.scss';
import { setSelectedMonth } from '../modules/root/root.actions';

import { loadBudget } from '../modules/thunks';
import { AppState } from '../redux/state';
import styled from 'styled-components';

const MonthSelectorStyled = styled.div`
  font-family: 'Gelasio', serif;
  color: var(--background-light);
  font-size: 6rem;
  line-height: .9;
  font-weight: bold;
  letter-spacing: 7px;

  margin: .7rem 1rem;
`

export default function MonthSelector() {
  const dispatch = useDispatch();
  let selectedMonth = useSelector((state: AppState) => state.selectedMonth);

  return (
    <MonthSelectorStyled>
      <div className="month">{format(selectedMonth, 'MMMM')}</div>
      {/* <div className="year">{format(selectedMonth, 'Y')}</div> */}

      {/* <div>
        <span
          className="change-month-arrow"
          onClick={() => {
            let newDate = add(selectedMonth, { months: -1 });
            dispatch(loadBudget(newDate));

            dispatch(setSelectedMonth(newDate));
          }}
        >
          {'<'}
        </span>
        <span
          className="change-month-arrow"
          onClick={() => {
            let newDate = add(selectedMonth, { months: 1 });
            dispatch(loadBudget(newDate));

            dispatch(setSelectedMonth(newDate));
          }}
        >
          {'>'}
        </span>
      </div> */}
    </MonthSelectorStyled>
  );
}
