import useAppearance from 'commons/appearance/useAppearance'
import React, { forwardRef } from 'react'
import { INPUT_CLASSNAMES } from './variants'

const InputField = forwardRef(function InputField(props, ref) {
  const { label, className, fieldState, kit } = props
  const interfaceKit = useAppearance()
  const inputStyle = (kit ?? interfaceKit).input
  const inputVariant = INPUT_CLASSNAMES[inputStyle]

  return (
    <div className="form-control">
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
      <input
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

export default InputField
