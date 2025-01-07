import React, { useEffect, useState } from 'react'

import { List } from 'commons/components'
import CardRow from './CardRow'
import searchItems from 'commons/utils/Table/SearchItems'
import SearchField from 'commons/components/Table/SearchField'

const ListComponentCardLayout = ({
  items,
  isSearchable,
  itemsAttrs,
  itemsEvents,
}) => {
  const [viewItems, setViewItems] = useState(items)

  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    var newItems = items
    newItems = searchItems(newItems, searchText, itemsAttrs, ['logoUrl'])

    setViewItems(newItems)
  }, [searchText])

  const updateSearchText = newSearchText => setSearchText(newSearchText)

  return (
    <>
      {isSearchable && <SearchField updateSearchText={updateSearchText} />}
      <List column="4">
        {viewItems?.map(collection =>
          collection?.map(item => (
            <CardRow
              key={item.id}
              item={item}
              itemsAttrs={itemsAttrs}
              itemsEvents={itemsEvents}
            />
          ))
        )}
      </List>
    </>
  )
}

export default ListComponentCardLayout
