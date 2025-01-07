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
import RoleTable from '../components/RoleTable'

import getRoleListElement from '../services/getRoleListElement'
const DaftarRolePage = props => {
  const { checkPermission } = useAuth()

  const [isLoading, setIsLoading] = useState({
    tableRole: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [roleListElement, setRoleListElement] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, tableRole: true }))
        const { data: roleListElement } = await getRoleListElement()
        setRoleListElement(roleListElement.data)
      } finally {
        setIsLoading(prev => ({ ...prev, tableRole: false }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('Daftar Role Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerButtonLayout>
            <Link to={`/settings/role/tambah`}>
              {' '}
              <Button className="p-2" variant="primary">
                Tambah Role
              </Button>
            </Link>
          </Layouts.ViewContainerButtonLayout>
        </>
      }
    >
      <Layouts.ListContainerTableLayout
        title={'Table Role'}
        singularName={'Role'}
        items={[roleListElement]}
        isLoading={isLoading.tableRole}
      >
        <RoleTable roleListElement={roleListElement} />
      </Layouts.ListContainerTableLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default DaftarRolePage
