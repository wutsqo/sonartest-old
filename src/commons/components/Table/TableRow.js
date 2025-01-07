import React from 'react'

const TableRow = ({ onClick, children }) => {
  return <tr onClick={onClick}>{children}</tr>
}

export default TableRow
