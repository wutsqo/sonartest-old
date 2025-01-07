const filterItems = (items, filterTextList) => {
  return filterTextList
    ? items?.map(collection =>
        collection?.filter(item =>
          filterTextList?.every(
            filterText =>
              item[filterText.featureName] &&
              item[filterText.featureName].includes(filterText.text)
          )
        )
      )
    : items
}

export default filterItems
