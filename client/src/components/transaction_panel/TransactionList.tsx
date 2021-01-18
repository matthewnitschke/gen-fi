import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState, Transaction } from '../../redux/state';
import TransactionBadge from './TransactionBadge';

interface TransactionListProps {
    transactions: Array<Transaction>
}

export default function TransactionList(props: TransactionListProps) {
    const dateGroupedTransactions = props.transactions.reduce((accumulator, transaction) => {
        let date = format(transaction.date, 'M/d');

        accumulator.set(date, accumulator.get(date) ?? []);
        accumulator.get(date)!.push(transaction);

        return accumulator;
    }, new Map<String, Array<Transaction>>())

    let orderedDates = Array.from(dateGroupedTransactions.keys());
    orderedDates.sort()

    return <div>
        {orderedDates.map(date => {
            return <div>
                <div>{date}</div>

                {dateGroupedTransactions.get(date)?.map(transaction => {
                    return <TransactionBadge
                        key={transaction.id}
                        transaction={transaction}
                    />
                })}
            </div>
        })}
    </div>
}