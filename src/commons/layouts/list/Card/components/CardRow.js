import React from 'react'

import { ListItem, VisualizationAttr } from 'commons/components'

const CardRow = ({ item, itemsAttrs, itemsEvents }) => {
  return (
    <ListItem>
      {/* Data Binding [singularName /] Card Element */}
      <div className="card-body justify-between">
        {itemsAttrs?.map(itemsAttr => (
          <VisualizationAttr content={item[itemsAttr.featureName]} />
        ))}
        <div className="card-actions justify-end">
          {/* View Element Event [singularName /] Card Element*/}
          {itemsEvents(item)?.map(event => event)}
        </div>
      </div>
    </ListItem>
  )
}

export default CardRow
