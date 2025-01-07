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
import FormUbahRole from '../components/FormUbahRole'

import getRole from '../services/getRole'
import getAllowedPermissions from '../services/getAllowedPermissions'
const UbahRolePage = props => {
  const [isLoading, setIsLoading] = useState({
    ubahRole: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [role, setRole] = useState()
  const [allowedPermissions, setAllowedPermissions] = useState()
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(prev => ({ ...prev, ubahRole: true }))
      const { data: roleResponse } = await getRole({ id })
      const { data: allowedPermissionsResponse } = await getAllowedPermissions({
        id,
      })

      setRole(roleResponse.data)
      setAllowedPermissions(allowedPermissionsResponse.data)

      setIsLoading(prev => ({ ...prev, ubahRole: false }))
    }
    fetch()
  }, [])

  useEffect(() => {
    setTitle('Ubah Role Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/settings/role/${id}`}>
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
        singularName={'Role'}
        isLoading={isLoading.ubahRole}
      >
        {role && allowedPermissions ? (
          <>
            <FormUbahRole
              {...{
                role,
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
export default UbahRolePage
