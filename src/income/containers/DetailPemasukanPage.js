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

import DetailPemasukan from '../components/DetailPemasukan'
import getIncomeData from '../services/getIncomeData'
const DetailPemasukanPage = props => {
  const [isLoading, setIsLoading] = useState({
    detailPemasukan: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [incomeData, setIncomeData] = useState()
  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, detailPemasukan: true }))
        const { data: incomeData } = await getIncomeData({ id })
        setIncomeData(incomeData.data)
      } finally {
        setIsLoading(prev => ({ ...prev, detailPemasukan: false }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('Detail Pemasukan  Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/income`}>
              {' '}
              <Button className="p-4 w-full" variant="secondary">
                Kembali
              </Button>
            </Link>
          </Layouts.ViewContainerBackButtonLayout>
        </>
      }
    >
      <Layouts.DetailContainerLayout
        title={'Detail Pemasukan'}
        singularName={'Pemasukan'}
        items={{ ...incomeData }}
        isLoading={isLoading.detailPemasukan}
        isCorrelatedWithAnotherComponent={false}
      >
        <DetailPemasukan {...{ data: { ...incomeData } }} />
      </Layouts.DetailContainerLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default DetailPemasukanPage
