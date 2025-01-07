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
import ModifiedFormTambahPengeluaran from '../components/ModifiedFormTambahPengeluaran'

import getPrograms from '../services/getPrograms'
import getChartOfAccounts from '../services/getChartOfAccounts'
const TambahPengeluaranPage = props => {
  const [isLoading, setIsLoading] = useState({
    tambahPengeluaran: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [programs, setPrograms] = useState()
  const [chartOfAccounts, setChartOfAccounts] = useState()
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(prev => ({ ...prev, tambahPengeluaran: true }))
      const { data: programsResponse } = await getPrograms()
      const { data: chartOfAccountsResponse } = await getChartOfAccounts()

      setPrograms(programsResponse.data)
      setChartOfAccounts(chartOfAccountsResponse.data)

      setIsLoading(prev => ({ ...prev, tambahPengeluaran: false }))
    }
    fetch()
  }, [])

  useEffect(() => {
    setTitle('Tambah Pengeluaran Page')
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
        isLoading={isLoading.tambahPengeluaran}
      >
        {programs && chartOfAccounts ? (
          <>
            <ModifiedFormTambahPengeluaran
              {...{
                programs,
                chartOfAccounts,
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
export default TambahPengeluaranPage
