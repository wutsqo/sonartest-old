import React from 'react'

const Form = props => {
  const { title, id_name, children } = props

  return (
    <div className="max-w-lg mx-auto prose sm:p-6">
      <h2 className="h2">{title}</h2>
      <form className="bg-white card shadow-xl" id={id_name} {...props}>
        <div className="card-body">
          <fieldset className="space-y-4 col-end-2">{children}</fieldset>
        </div>
      </form>
    </div>
  )
}

export default Form
