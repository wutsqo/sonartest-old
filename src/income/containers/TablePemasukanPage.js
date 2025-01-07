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
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'commons/auth'
import PemasukanTable from '../components/PemasukanTable'

import getFilterPrograms from '../services/getFilterPrograms'
import getIncomeListElement from '../services/getIncomeListElement'
const TablePemasukanPage = props => {
  const { checkPermission } = useAuth()

  const [isLoading, setIsLoading] = useState({
    tablePemasukan: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [filterPrograms, setFilterPrograms] = useState()
  const [incomeListElement, setIncomeListElement] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, tablePemasukan: true }))
        const { data: filterPrograms } = await getFilterPrograms()
        const { data: incomeListElement } = await getIncomeListElement()
        setFilterPrograms(filterPrograms.data)
        setIncomeListElement(incomeListElement.data)
      } finally {
        setIsLoading(prev => ({ ...prev, tablePemasukan: false }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('Table Pemasukan Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerButtonLayout>
            {checkPermission('CreateIncome') && (
              <Link to={`/income/tambah`}>
                {' '}
                <Button className="p-2" variant="primary">
                  Tambah Pemasukan
                </Button>
              </Link>
            )}
          </Layouts.ViewContainerButtonLayout>
        </>
      }
    >
      <Layouts.ListContainerTableLayout
        title={'Table Pemasukan'}
        singularName={'Pemasukan'}
        items={[filterPrograms, incomeListElement]}
        isLoading={isLoading.tablePemasukan}
      >
        <PemasukanTable
          filterPrograms={filterPrograms}
          incomeListElement={incomeListElement}
        />
      </Layouts.ListContainerTableLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default TablePemasukanPage
