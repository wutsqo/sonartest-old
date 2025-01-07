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
import ModifiedFormTambahPemasukan from '../components/ModifiedFormTambahPemasukan'

import getPrograms from '../services/getPrograms'
import getChartOfAccounts from '../services/getChartOfAccounts'
const TambahPemasukanPage = props => {
  const [isLoading, setIsLoading] = useState({
    tambahPemasukan: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [programs, setPrograms] = useState()
  const [chartOfAccounts, setChartOfAccounts] = useState()
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(prev => ({ ...prev, tambahPemasukan: true }))
      const { data: programsResponse } = await getPrograms()
      const { data: chartOfAccountsResponse } = await getChartOfAccounts()

      setPrograms(programsResponse.data)
      setChartOfAccounts(chartOfAccountsResponse.data)

      setIsLoading(prev => ({ ...prev, tambahPemasukan: false }))
    }
    fetch()
  }, [])

  useEffect(() => {
    setTitle('Tambah Pemasukan Page')
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
        isLoading={isLoading.tambahPemasukan}
      >
        {programs && chartOfAccounts ? (
          <>
            <ModifiedFormTambahPemasukan
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
export default TambahPemasukanPage
