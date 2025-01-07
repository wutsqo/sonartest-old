import React from 'react'

const VisualizationAttr = ({ label, content, isCurrency }) => {
  const checkIsImage = content => {
    if (content.match(/\.(jpeg|jpg|gif|png)(\?.*)?$/) != null) return true
    return content.match(/(data:image)/) != null
  }

  const checkIsArray = content => {
    return content instanceof Array
  }

  const formatCurrency = amount => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount)
  }

  const isImage = typeof content == 'string' && checkIsImage(content)
  const isArray = checkIsArray(content)

  return (
    <div className="mb-2">
      {!isImage && (
        <label className="label">
          <span className="label-text text-sm uppercase font-medium text-gray-400">
            {label}
          </span>
        </label>
      )}
      {isCurrency ? (
        <div>{formatCurrency(content)}</div>
      ) : (
        <div>
          {isImage ? (
            <img
              src={content}
              alt={label}
              className="aspect-[4/3] w-full max-h-96 object-cover rounded-btn overflow-hidden"
            />
          ) : isArray ? (
            content.join(', ')
          ) : (
            content
          )}
        </div>
      )}
    </div>
  )
}

export default VisualizationAttr
