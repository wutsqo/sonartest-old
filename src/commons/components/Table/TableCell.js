import React from 'react'

const TableCell = ({
  isCurrency,
  isHeading,
  isHiddenMobile,
  children,
  className,
}) => {
  const format_currency = children => {
    const amount = parseInt(children)
    if (Number.isNaN(amount)) return ''
    const format = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      currencyDisplay: 'code',
    })
      .format(amount < 0 ? -amount : amount)
      .replace('IDR', '')
    return amount < 0 ? `(${format})` : format
  }

  const checkIsArray = children => {
    return children instanceof Array
  }

  const isArray = checkIsArray(children)

  return isHeading ? (
    <th
      style={{ zIndex: 0 }}
      className={`${isHiddenMobile && 'hidden sm:table-cell'} ${className}`}
    >
      {children}
    </th>
  ) : (
    <td
      className={`whitespace-normal break-words ${isHiddenMobile &&
        'hidden sm:table-cell'} ${className}`}
      style={{ textAlign: isCurrency ? 'right' : 'inherit' }}
    >
      {isCurrency ? (
        <span className="flex justify-between">
          <span>Rp</span>
          {format_currency(children)}
        </span>
      ) : isArray ? (
        children.join(', ')
      ) : (
        children
      )}
    </td>
  )
}

export default TableCell
