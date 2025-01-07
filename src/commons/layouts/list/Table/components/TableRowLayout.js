import React from 'react'

const { TableRow, TableCell } = require('commons/components')

const TableRowLayout = ({
  item,
  detail,
  itemsAttrs,
  itemsEvents,
  itemsModals,
}) => {
  return (
    <TableRow distinct={false} onClick={() => detail(item)}>
      {/* Data Binding Pengeluaran Table Element*/}
      {itemsAttrs?.map(itemsAttr => (
        <TableCell
          id={itemsAttr.id}
          isCurrency={itemsAttr.condition.includes('isCurrency')}
          isHiddenMobile={itemsAttr.condition.includes('isHiddenMobile')}
        >
          {item[itemsAttr.featureName]}
        </TableCell>
      ))}
      {itemsEvents && (
        <>
          <TableCell isHiddenMobile>
            <div class="btn-group gap-2">
              {/* View Element Event Pengeluaran Table Element*/}
              {itemsEvents(item)?.map(event => event)}
            </div>
          </TableCell>
          {itemsModals(item)?.map(modal => modal)}
        </>
      )}
    </TableRow>
  )
}

export default TableRowLayout
