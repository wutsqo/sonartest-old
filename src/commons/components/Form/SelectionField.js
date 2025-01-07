import React, { forwardRef } from 'react'
import { INPUT_CLASSNAMES } from './variants'
import useAppearance from 'commons/appearance/useAppearance'

const SelectionField = forwardRef((props, ref) => {
  const {
    label,
    variant,
    options,
    placeholder,
    className,
    fieldState,
    kit,
  } = props
  const interfaceKit = useAppearance()
  const inputStyle = (kit ?? interfaceKit).input
  const inputVariant = INPUT_CLASSNAMES[inputStyle]

  return (
    <div className="form-control" {...variant}>
      {label && (
        <label className="label label-text justify-start">
          {label}{' '}
          {props.isRequired && (
            <font className="ml-1" color="red">
              *
            </font>
          )}
        </label>
      )}
      <select
        className={`select ${inputVariant} w-full whitespace-normal ${fieldState?.error &&
          'select-error'} ${className}`}
        ref={ref}
        {...props}
        {...variant}
      >
        <option disabled selected hidden>
          {placeholder}
        </option>
        {options &&
          options.map(option => (
            <option value={option.id}>{option.name}</option>
          ))}
      </select>
      {fieldState?.error && (
        <label className="label label-text text-error">
          {fieldState.error.message}
        </label>
      )}
    </div>
  )
})

export default SelectionField
