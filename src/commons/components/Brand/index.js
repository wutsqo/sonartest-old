import React from 'react'
import { Link } from 'react-router-dom'

const Brand = ({ onCLick, isMobileFirst }) => {
  const className =
    'btn-ghost normal-case text-xl' +
    (isMobileFirst ? ' p-0 no-underline font-semibold' : ' btn')

  return (
    <Link to={'/'} onClick={onCLick} className={className}>
      Aisco
    </Link>
  )
}

export default Brand
