import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { format, add } from 'date-fns';

import '../styles/month-selector.scss';
import { setSelectedMonth } from '../modules/selectedMonth/selectedMonth.actions';

export default function MonthSelector() {
    const dispatch = useDispatch();
    let selectedMonth = useSelector(state => state.selectedMonth);

    return <div className="month-selector">
        <div className="current-month-label">
            <div className="month">{format(selectedMonth, 'MMMM')}</div>
            <div className="year">{format(selectedMonth, 'Y')}</div>
        </div>

        <div>
            <span 
                className="change-month-arrow" 
                onClick={() => {
                    let newDate = add(selectedMonth, { months: -1 });
                    dispatch(setSelectedMonth(newDate))
                }}
            >{'<'}</span>
            <span 
                className="change-month-arrow"
                onClick={() => {
                    let newDate = add(selectedMonth, { months: 1 });
                    dispatch(setSelectedMonth(newDate))
                }}
            >{'>'}</span>
        </div>
    </div>
}