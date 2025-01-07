/*
	Generated on 13/06/2024 by UI Generator PRICES-IDE
	https://amanah.cs.ui.ac.id/research/ifml-regen
	version 3.4.0
*/
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Button,
  Form,
  SelectionField,
  MultiSelectionField,
  InputField,
  MultiSelectField,
  TextAreaField,
  VisualizationAttr,
  Spinner,
} from 'commons/components'
import {
  ALLOWED_PERMISSIONS,
  findAllowedPermission,
} from 'commons/constants/allowedPermission'
import cleanFormData from 'commons/utils/cleanFormData'

import changeroleUser from '../services/changeroleUser'

import { ToasterError } from 'commons/components'
import * as Layouts from 'commons/layouts'

const FormUbahRoleUser = ({ user, roles }) => {
  const { control, handleSubmit } = useForm({ defaultValues: user })

  const navigate = useNavigate()

  const kirim = data => {
    const cleanData = cleanFormData(data)
    changeroleUser({
      ...cleanData,
    })
      .then(({ data: { data } }) => {
        navigate(`/settings/user/${user.id}`)
      })
      .catch(error => {
        console.error(error)
        toast.error(t => <ToasterError error={error} t={t} />)
      })
  }

  return (
    <Layouts.FormComponentLayout
      title="Ubah Role User"
      onSubmit={handleSubmit(kirim)}
      vas={[]}
      formFields={[
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <InputField
              label="Name"
              placeholder="Masukkan name"
              disabled
              defaultValue={user.name}
              fieldState={fieldState}
              {...field}
              isRequired={false}
            />
          )}
        />,
        <Controller
          name="roleIds"
          control={control}
          render={({ field, fieldState }) => (
            <MultiSelectionField
              label="Roles"
              options={roles}
              placeholder="Masukkan roles"
              fieldState={fieldState}
              defaultValue={user.roleIds}
              {...field}
              isRequired={false}
            />
          )}
        />,
      ]}
      itemsEvents={[
        <Button type="submit" variant="primary">
          Kirim
        </Button>,
      ]}
    />
  )
}

export default FormUbahRoleUser
