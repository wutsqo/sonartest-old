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

import DetailPengeluaran from '../components/DetailPengeluaran'
import getExpenseData from '../services/getExpenseData'
const DetailPengeluaranPage = props => {
  const [isLoading, setIsLoading] = useState({
    detailPengeluaran: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [expenseData, setExpenseData] = useState()
  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, detailPengeluaran: true }))
        const { data: expenseData } = await getExpenseData({ id })
        setExpenseData(expenseData.data)
      } finally {
        setIsLoading(prev => ({ ...prev, detailPengeluaran: false }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('Detail Pengeluaran Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/expense`}>
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
        title={'Detail Pengeluaran'}
        singularName={'Pengeluaran'}
        items={{ ...expenseData }}
        isLoading={isLoading.detailPengeluaran}
        isCorrelatedWithAnotherComponent={false}
      >
        <DetailPengeluaran {...{ data: { ...expenseData } }} />
      </Layouts.DetailContainerLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default DetailPengeluaranPage
