import React, {useEffect, useRef} from 'react';

import Transaction from './Transaction.jsx';


import '../styles/transactions.scss';

export default function Transactions() {

    return <div className="transactions">
        <Transaction amount={140} merchant="Amazon"/>
        <Transaction amount={140} merchant="Amazon"/>
    </div>
}