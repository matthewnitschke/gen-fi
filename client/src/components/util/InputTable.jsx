import React, { useState } from 'react';

import '../../styles/input-table.scss';

export default function InputTable({ rows = [], onChange }) {
  let totalAmount = rows.reduce((acc, row) => acc + parseInt(row.amount), 0);
  return (
    <div className="input-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <TableRow
              key={r.name + r.amount}
              data={r}
              onChange={(rowData) => {
                let i = rows.indexOf(r);
                return onChange([
                  ...rows.slice(0, rows.indexOf(r)),
                  rowData,
                  ...rows.slice(rows.indexOf(r) + 1),
                ]);
              }}
            />
          ))}
          <tr>
            <td>
              <input
                type="button"
                value="Add"
                onClick={() => onChange([...rows, { name: '', amount: 0 }])}
              />
            </td>
            <td>Total: {totalAmount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ data, onChange, onDelete }) {
  let [internalName, setInternalName] = useState(data.name);
  let [internalAmount, setInternalAmount] = useState(data.amount);

  function commit() {
    onChange({
      ...data,
      name: internalName,
      amount: parseInt(internalAmount),
    });
  }

  return (
    <tr>
      <td>
        <input
          type="text"
          value={internalName}
          onChange={(e) => setInternalName(e.target.value)}
          onBlur={commit}
        />
      </td>
      <td>
        <input
          type="number"
          value={internalAmount}
          onChange={(e) => setInternalAmount(e.target.value)}
          onBlur={commit}
        />
      </td>
      <td>
        <input type="button" value="Delete" onClick={onDelete} />
      </td>
    </tr>
  );
}
