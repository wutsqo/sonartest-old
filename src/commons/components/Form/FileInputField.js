import useAppearance from 'commons/appearance/useAppearance'
import React, { forwardRef } from 'react'
import { INPUT_CLASSNAMES } from './variants'

const FileInputField = forwardRef(function FileInputField(props, ref) {
  const {
    label,
    className = '',
    kit,
    defaultValue,
    fieldState,
    ...rest
  } = props
  const interfaceKit = useAppearance()
  const inputStyle = (kit ?? interfaceKit).input
  const inputVariant = INPUT_CLASSNAMES[inputStyle]

  const getImage = image => {
    if (image instanceof File) {
      return URL.createObjectURL(image)
    } else {
      return image
    }
  }

  const checkIsImage = content => {
    if (content instanceof File) {
      return true
    }
    if (!content) {
      return false
    }
    if (content?.match(/\.(jpeg|jpg|gif|png)$/) != null) return true
    return content?.match(/(data:image)/) != null
  }

  if (rest.defaultValue) {
    delete rest.defaultValue
  }

  if (rest.value) {
    delete rest.value
  }

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
      {defaultValue && checkIsImage(defaultValue) && (
        <img
          src={getImage(defaultValue)}
          alt={label}
          className="aspect-[4/3] w-full max-h-96 object-cover rounded-btn overflow-hidden"
        />
      )}
      <input
        className={`file-input w-full ${inputVariant} ${fieldState?.error &&
          'input-error'} ${className}`}
        ref={ref}
        type="file"
        {...rest}
        onChange={e => props.onChange(e.target.files[0])}
      />
      {fieldState?.error && (
        <label className="label label-text text-error">
          {fieldState.error.message}
        </label>
      )}
    </div>
  )
})

export default FileInputField
