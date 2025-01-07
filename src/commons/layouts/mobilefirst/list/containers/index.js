import React from 'react'

import { Spinner } from 'commons/components'
import useAppearanceStore from 'commons/appearance/store'

const ListContainerCardLayoutMobileFirst = ({
  listName,
  isLoading,
  items,
  children,
}) => {
  const { colorTheme } = useAppearanceStore()

  return (
    <div data-theme={colorTheme} className="prose max-w-md pb-16 pt-4">
      <div className="pl-4 pr-4 pb-16">
        {isLoading ? (
          <div className="py-8 text-center">
            <Spinner />
          </div>
        ) : items?.length !== 0 ? (
          <>
            <h4 className="text-black m-0">{listName}</h4>
            {children}
          </>
        ) : (
          <div className="py-8 text-center">
            Tidak ada data untuk ditampilkan
          </div>
        )}
      </div>
    </div>
  )
}

export default ListContainerCardLayoutMobileFirst
