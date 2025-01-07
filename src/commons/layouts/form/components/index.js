import React from 'react'
import { Form } from 'commons/components'

const FormComponentLayout = ({
  title,
  onSubmit,
  vas,
  formFields,
  itemsEvents,
}) => {
  return (
    <Form title={title} onSubmit={onSubmit}>
      {vas}
      {formFields}
      <div className="card-actions justify-end">{itemsEvents}</div>
    </Form>
  )
}

export default FormComponentLayout
