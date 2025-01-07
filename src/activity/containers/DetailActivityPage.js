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

import DetailActivity from '../components/DetailActivity'
import getActivityData from '../services/getActivityData'
const DetailActivityPage = props => {
  const [isLoading, setIsLoading] = useState({
    detailActivity: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [activityData, setActivityData] = useState()
  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, detailActivity: true }))
        const { data: activityData } = await getActivityData({ id })
        setActivityData(activityData.data)
      } finally {
        setIsLoading(prev => ({ ...prev, detailActivity: false }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('Detail Activity Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/activity`}>
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
        title={'Detail Activity'}
        singularName={'Activity'}
        items={{ ...activityData }}
        isLoading={isLoading.detailActivity}
        isCorrelatedWithAnotherComponent={false}
      >
        <DetailActivity {...{ data: { ...activityData } }} />
      </Layouts.DetailContainerLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default DetailActivityPage
