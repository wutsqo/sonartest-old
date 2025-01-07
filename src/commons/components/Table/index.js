import useAppearance from 'commons/appearance/useAppearance'
import React from 'react'
import { TABLE_CLASSNAMES } from './variants'

const Table = ({ children, compact, className, kit }) => {
  const interfaceKit = useAppearance()
  const tableStyle = (kit ?? interfaceKit)?.table
  const tableVariant = TABLE_CLASSNAMES[tableStyle]

  return (
    <div className="overflow-x-auto">
      <table
        className={`table w-full ${compact &&
          'table-compact'} ${tableVariant} ${className}`}
      >
        {children}
      </table>
    </div>
  )
}

export default Table
