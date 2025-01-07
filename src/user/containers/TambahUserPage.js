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
import FormTambahkanUser from '../components/FormTambahkanUser'

import getRoles from '../services/getRoles'
import getAllowedPermissions from '../services/getAllowedPermissions'
const TambahUserPage = props => {
  const [isLoading, setIsLoading] = useState({
    tambahkanUser: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [roles, setRoles] = useState()
  const [allowedPermissions, setAllowedPermissions] = useState()
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(prev => ({ ...prev, tambahkanUser: true }))
      const { data: rolesResponse } = await getRoles()
      const { data: allowedPermissionsResponse } = await getAllowedPermissions()

      setRoles(rolesResponse.data)
      setAllowedPermissions(allowedPermissionsResponse.data)

      setIsLoading(prev => ({ ...prev, tambahkanUser: false }))
    }
    fetch()
  }, [])

  useEffect(() => {
    setTitle('Tambah User Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/settings/user`}>
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
        singularName={'User'}
        isLoading={isLoading.tambahkanUser}
      >
        {roles && allowedPermissions ? (
          <>
            <FormTambahkanUser
              {...{
                roles,
                allowedPermissions,
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
export default TambahUserPage
