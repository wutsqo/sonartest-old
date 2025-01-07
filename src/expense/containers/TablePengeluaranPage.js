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
import PengeluaranTable from '../components/PengeluaranTable'

import getFilterPrograms from '../services/getFilterPrograms'
import getExpenseListElement from '../services/getExpenseListElement'
const TablePengeluaranPage = props => {
  const { checkPermission } = useAuth()

  const [isLoading, setIsLoading] = useState({
    tablePengeluaran: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [filterPrograms, setFilterPrograms] = useState()
  const [expenseListElement, setExpenseListElement] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, tablePengeluaran: true }))
        const { data: filterPrograms } = await getFilterPrograms()
        const { data: expenseListElement } = await getExpenseListElement()
        setFilterPrograms(filterPrograms.data)
        setExpenseListElement(expenseListElement.data)
      } finally {
        setIsLoading(prev => ({ ...prev, tablePengeluaran: false }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('Table Pengeluaran Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerButtonLayout>
            {checkPermission('CreateExpense') && (
              <Link to={`/expense/tambah`}>
                {' '}
                <Button className="p-2" variant="primary">
                  Tambah Pengeluaran
                </Button>
              </Link>
            )}
          </Layouts.ViewContainerButtonLayout>
        </>
      }
    >
      <Layouts.ListContainerTableLayout
        title={'Table Pengeluaran'}
        singularName={'Pengeluaran'}
        items={[filterPrograms, expenseListElement]}
        isLoading={isLoading.tablePengeluaran}
      >
        <PengeluaranTable
          filterPrograms={filterPrograms}
          expenseListElement={expenseListElement}
        />
      </Layouts.ListContainerTableLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default TablePengeluaranPage
