import React from 'react'

const Detail = ({ children }) => {
  return (
    <div className="mx-auto w-full bg-white shadow-xl card not-prose">
      <div className="card-body">{children}</div>
    </div>
  )
}

export default Detail
