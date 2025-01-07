import useAppearance from 'commons/appearance/useAppearance'
import React, { forwardRef } from 'react'
import { INPUT_CLASSNAMES } from './variants'
import Select from 'react-select'

const MultiSelectField = forwardRef(function MultiSelectField(props, ref) {
  const { label, className, fieldState, kit } = props
  const interfaceKit = useAppearance()
  const inputStyle = (kit ?? interfaceKit).input
  const inputVariant = INPUT_CLASSNAMES[inputStyle]

  return (
    <div className="form-control">
      {label && <label className="label label-text">{label}</label>}
      <Select
        className={`input ${inputVariant} ${fieldState?.error &&
          'input-error'} ${className}`}
        ref={ref}
        {...props}
      />
      {fieldState?.error && (
        <label className="label label-text text-error">
          {fieldState.error.message}
        </label>
      )}
    </div>
  )
})

export default MultiSelectField
