import React from 'react'

import { Spinner } from 'commons/components'

const DetailContainerLayout = ({
  title,
  singularName,
  isLoading,
  items,
  children,
  isCorrelatedWithAnotherComponent,
}) => {
  return (
    <div
      className={`prose ${
        isCorrelatedWithAnotherComponent
          ? 'w-full max-w-screen-xl'
          : 'max-w-screen-lg'
      } sm:mx-auto`}
    >
      <h2 className="text-center sm:text-left">{title}</h2>
      {isLoading ? (
        <div className={'py-8 text-center'}>
          <Spinner />
        </div>
      ) : Object.keys(items).length ? (
        children
      ) : (
        <div className="py-8 text-center">
          Tidak ada detail data untuk ditampilkan
        </div>
      )}
    </div>
  )
}

export default DetailContainerLayout
