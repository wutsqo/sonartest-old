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
  FileInputField,
} from 'commons/components'
import {
  ALLOWED_PERMISSIONS,
  findAllowedPermission,
} from 'commons/constants/allowedPermission'
import cleanFormData from 'commons/utils/cleanFormData'

import updateActivity from '../services/updateActivity'

import { ToasterError } from 'commons/components'
import * as Layouts from 'commons/layouts'

const ModifiedFormUbahActivity = ({ activityData }) => {
  const { control, handleSubmit } = useForm({ defaultValues: activityData })

  const navigate = useNavigate()

  const kirim = data => {
    const cleanData = cleanFormData(data)
    updateActivity({
      ...cleanData,
    })
      .then(({ data: { data } }) => {
        navigate(`/activity/${activityData.id}`)
      })
      .catch(error => {
        console.error(error)
        toast.error(t => <ToasterError error={error} t={t} />)
      })
  }

  return (
    <Layouts.FormComponentLayout
      title="Ubah Activity"
      onSubmit={handleSubmit(kirim)}
      vas={[]}
      formFields={[
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Harap masukkan nama program' }}
          render={({ field, fieldState }) => (
            <InputField
              label="Nama Program"
              placeholder="Masukkan nama program"
              defaultValue={activityData.name}
              fieldState={fieldState}
              {...field}
              isRequired={true}
            />
          )}
        />,
        <Controller
          name="description"
          control={control}
          rules={{ required: 'Harap masukkan deskripsi' }}
          render={({ field, fieldState }) => (
            <TextAreaField
              label="Deskripsi"
              placeholder="Masukkan deskripsi"
              defaultValue={activityData.description}
              fieldState={fieldState}
              {...field}
              isRequired={true}
            />
          )}
        />,
        <Controller
          name="target"
          control={control}
          render={({ field, fieldState }) => (
            <InputField
              label="Target"
              placeholder="Masukkan target"
              defaultValue={activityData.target}
              fieldState={fieldState}
              {...field}
              isRequired={false}
            />
          )}
        />,
        <Controller
          name="partner"
          control={control}
          render={({ field, fieldState }) => (
            <InputField
              label="Partner"
              placeholder="Masukkan partner"
              defaultValue={activityData.partner}
              fieldState={fieldState}
              {...field}
              isRequired={false}
            />
          )}
        />,
        <Controller
          name="executionDate"
          control={control}
          rules={{ required: 'Harap masukkan tanggal pelaksanaan' }}
          render={({ field, fieldState }) => (
            <InputField
              label="Tanggal Pelaksanaan"
              placeholder="Masukkan tanggal pelaksanaan"
              type="date"
              defaultValue={activityData.executionDate}
              fieldState={fieldState}
              {...field}
              isRequired={true}
            />
          )}
        />,
        <Controller
          name="logoUrl"
          control={control}
          rules={{ required: 'Harap masukkan gambar program' }}
          render={({ field, fieldState }) => (
            <FileInputField
              label="Gambar Program"
              placeholder="Masukkan gambar program"
              defaultValue={activityData.logoUrl}
              fieldState={fieldState}
              {...field}
              isRequired={true}
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

export default ModifiedFormUbahActivity
