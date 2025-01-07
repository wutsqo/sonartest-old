/*
	Generated on 13/06/2024 by UI Generator PRICES-IDE
	https://amanah.cs.ui.ac.id/research/ifml-regen
	version 3.4.0
*/
import React, { useEffect, useState, useContext } from 'react'
import { Button, Spinner } from 'commons/components'
import * as Layouts from 'commons/layouts'
import { Link, useParams } from 'react-router-dom'
import { HeaderContext } from 'commons/components'
import isSelectedFeature from 'commons/utils/isSelectedFeature'
import { useSearchParams } from 'react-router-dom'
import ModifiedFormUbahPengeluaran from '../components/ModifiedFormUbahPengeluaran'

import getPrograms from '../services/getPrograms'
import getChartOfAccounts from '../services/getChartOfAccounts'
import getExpense from '../services/getExpense'
const UbahPengeluaranPage = props => {
  const [isLoading, setIsLoading] = useState({
    ubahPengeluaran: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [programs, setPrograms] = useState()
  const [chartOfAccounts, setChartOfAccounts] = useState()
  const [expense, setExpense] = useState()
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(prev => ({ ...prev, ubahPengeluaran: true }))
      const { data: programsResponse } = await getPrograms({ id })
      const { data: chartOfAccountsResponse } = await getChartOfAccounts({ id })
      const { data: expenseResponse } = await getExpense({ id })

      setPrograms(programsResponse.data)
      setChartOfAccounts(chartOfAccountsResponse.data)
      setExpense(expenseResponse.data)

      setIsLoading(prev => ({ ...prev, ubahPengeluaran: false }))
    }
    fetch()
  }, [])

  useEffect(() => {
    setTitle('Ubah Pengeluaran Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/expense`}>
              {' '}
              <Button className="p-4" variant="secondary">
                Kembali
              </Button>
            </Link>
          </Layouts.ViewContainerBackButtonLayout>
        </>
      }
    >
      <Layouts.FormContainerLayout
        singularName={'Pengeluaran'}
        isLoading={isLoading.ubahPengeluaran}
      >
        {programs && chartOfAccounts && expense ? (
          <>
            <ModifiedFormUbahPengeluaran
              {...{
                programs,
                chartOfAccounts,
                expense,
              }}
            />
          </>
        ) : (
          <></>
        )}
      </Layouts.FormContainerLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default UbahPengeluaranPage
