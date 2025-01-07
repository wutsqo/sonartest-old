import { useRoutes } from 'react-router-dom'

import { commonRoutes, commonMobileRoutes } from 'commons/routes.js'
import userRoutes from 'user/routes'
import roleRoutes from 'role/routes'
import staticPageRoutes from 'staticPage/routes'
import homeRoutes from 'home/routes'
import activityRoutes from 'activity/routes'
import incomeRoutes from 'income/routes'
import expenseRoutes from 'expense/routes'
import arusKasReportRoutes from 'arusKasReport/routes'
import financialPositionRoutes from 'financialPosition/routes'
import activityReportRoutes from 'activityReport/routes'

const GlobalRoutes = () => {
  const router = useRoutes([
    ...commonRoutes,
    ...staticPageRoutes,
    ...userRoutes,
    ...roleRoutes,
    ...homeRoutes,
    ...activityRoutes,
    ...incomeRoutes,
    ...expenseRoutes,
    ...arusKasReportRoutes,
    ...financialPositionRoutes,
    ...activityReportRoutes,
  ])
  return router
}

const MobileRoutes = () => {
  const router = useRoutes([...commonMobileRoutes])
  return router
}

export { GlobalRoutes, MobileRoutes }
