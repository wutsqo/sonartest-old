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
import ModifiedFormUbahPemasukan from '../components/ModifiedFormUbahPemasukan'

import getPrograms from '../services/getPrograms'
import getChartOfAccounts from '../services/getChartOfAccounts'
import getIncome from '../services/getIncome'
const UbahPemasukanPage = props => {
  const [isLoading, setIsLoading] = useState({
    ubahPemasukan: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [programs, setPrograms] = useState()
  const [chartOfAccounts, setChartOfAccounts] = useState()
  const [income, setIncome] = useState()
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(prev => ({ ...prev, ubahPemasukan: true }))
      const { data: programsResponse } = await getPrograms({ id })
      const { data: chartOfAccountsResponse } = await getChartOfAccounts({ id })
      const { data: incomeResponse } = await getIncome({ id })

      setPrograms(programsResponse.data)
      setChartOfAccounts(chartOfAccountsResponse.data)
      setIncome(incomeResponse.data)

      setIsLoading(prev => ({ ...prev, ubahPemasukan: false }))
    }
    fetch()
  }, [])

  useEffect(() => {
    setTitle('Ubah Pemasukan Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/income`}>
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
        singularName={'Pemasukan'}
        isLoading={isLoading.ubahPemasukan}
      >
        {programs && chartOfAccounts && income ? (
          <>
            <ModifiedFormUbahPemasukan
              {...{
                programs,
                chartOfAccounts,
                income,
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
export default UbahPemasukanPage
