import React, { useState } from 'react';

import styled from 'styled-components';

const InputTableStyled = styled.div`
  tr:not(:last-child) {
    td:not(:last-child) {
      border: solid 1px black;
    }

    td:nth-child(2) {
      width: 3rem;
    }
  }

  input[type='text'],
  input[type='number'] {
    width: 100%;
    height: 100%;

    border: none;
    outline: none;
    padding: 0;
  }

  td {
    padding: 0.2rem;
  }
`;

// ----------------------------- InputTable Component -----------------------------

type RowData = {
  name: string;
  amount: number;
};

type InputTableProps = {
  rows: Array<RowData>;
  onChange: (newRows: Array<RowData>) => void;
};

export default function InputTable({ rows = [], onChange }: InputTableProps) {
  let totalAmount = rows.reduce((acc, row) => acc + row.amount, 0);
  return (
    <InputTableStyled>
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
                return onChange([
                  ...rows.slice(0, rows.indexOf(r)),
                  rowData,
                  ...rows.slice(rows.indexOf(r) + 1),
                ]);
              }}
              onDelete={() => alert('TODO: Implement delete')}
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
    </InputTableStyled>
  );
}

// --------------------------- TableRow Component ---------------------------
type TableRowProps = {
  data: RowData;
  onChange: (newData: RowData) => void;
  onDelete: () => void;
};

function TableRow({ data, onChange, onDelete }: TableRowProps) {
  let [internalName, setInternalName] = useState(data.name);
  let [internalAmount, setInternalAmount] = useState(data.amount);

  function commit() {
    onChange({
      ...data,
      name: internalName,
      amount: internalAmount,
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
          onChange={(e) => setInternalAmount(parseFloat(e.target.value))}
          onBlur={commit}
        />
      </td>
      <td>
        <input type="button" value="Delete" onClick={onDelete} />
      </td>
    </tr>
  );
}
