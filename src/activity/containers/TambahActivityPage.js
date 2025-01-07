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
import ModifiedFormTambahActivity from '../components/ModifiedFormTambahActivity'
const TambahActivityPage = props => {
  const [isLoading, setIsLoading] = useState({
    tambahActivity: false,
  })
  const { setTitle } = useContext(HeaderContext)

  useEffect(() => {
    setTitle('Tambah Activity Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/activity`}>
              {' '}
              <Button className="p-4" variant="secondary">
                Kembali
              </Button>
            </Link>
          </Layouts.ViewContainerBackButtonLayout>
        </>
      }
    >
      <Layouts.FormContainerLayout singularName={'Activity'}>
        <ModifiedFormTambahActivity {...props} />
      </Layouts.FormContainerLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default TambahActivityPage
