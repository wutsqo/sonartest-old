const FilterField = ({ filterField, updateFilterText }) => {
  return (
    <div className="w-fit-content">
      <select
        className="select relative m-0 block flex-auto rounded-md border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-sm font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        onChange={e =>
          updateFilterText(e.target.value, filterField.featureName)
        }
      >
        <option className={'text-gray-300'} selected value="">
          {`Filter ${filterField.label} Terkait`}
        </option>
        {filterField.options &&
          filterField.options.map(option => <option>{option.name}</option>)}
      </select>
    </div>
  )
}

export default FilterField
