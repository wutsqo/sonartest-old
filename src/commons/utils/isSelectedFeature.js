const isSelectedFeature = item => selectedFeatures.some(x => x.includes(item))

export default isSelectedFeature

var selectedFeatures = Array.from(
  new Set([
    'Core Program',
    'Activity',

    'Core Financial Report',
    'Expense',

    'Core Financial Report',
    'Income',

    'ArusKasReport',

    'FinancialPosition',

    'ActivityReport',

    'User',

    'Role',

    'Home',
  ])
)
