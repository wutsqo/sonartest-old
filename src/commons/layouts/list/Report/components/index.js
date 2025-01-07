import React from 'react'

import { Table } from 'commons/components'
import ReportRow from './ReportRow'

const ListComponentReportLayout = ({ items, itemsAttrs }) => {
  return (
    <div className="card bg-base-100">
      <div className="card-body p-0 sm:p-8 border sm:border-none">
        <Table compact>
          {items?.map(collection =>
            collection ? (
              <ReportRow items={collection} itemsAttrs={itemsAttrs} />
            ) : (
              <div className="py-8 text-center">
                Tidak ada data untuk ditampilkan
              </div>
            )
          )}
        </Table>
      </div>
    </div>
  )
}

export default ListComponentReportLayout
