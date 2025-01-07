import React from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { Button, InputField } from 'commons/components'
import { useAuth } from 'commons/auth'
import { Controller, useForm } from 'react-hook-form'
import useAppearanceStore from 'commons/appearance/store'
import { MdArrowBack } from 'react-icons/md'

const LoginMobilePage = () => {
  const { control, handleSubmit } = useForm()
  const { isAuth, loginGoogle, loginPassword } = useAuth()
  const { state } = useLocation()
  const navigate = useNavigate()
  const { colorTheme } = useAppearanceStore()

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const homeUrl = params.get('homeUrl')

  const loginWithPassword = data => {
    loginPassword(data)
    navigate(location.pathname + location.search)
  }

  if (isAuth) {
    return <Navigate to={homeUrl} />
  }

  return (
    <div data-theme={colorTheme} className="prose max-w-md mx-auto">
      <h3 className="text-white bg-primary p-5 m-0 flex items-center">
        <Link to={homeUrl} className="no-underline">
          <MdArrowBack className="mr-4" color="white" />
        </Link>
        Log in
      </h3>
      <form
        onSubmit={handleSubmit(loginWithPassword)}
        className="card-body not-prose"
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              type="email"
              label="Email"
              placeholder="Masukkan email"
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              type="password"
              label="Password"
              placeholder="Masukkan password"
              {...field}
            />
          )}
        />
        <div className="flex justify-end">
          <Link
            to="/mobile/forgot-password"
            className="btn btn-ghost btn-sm normal-case"
          >
            Lupa Password
          </Link>
        </div>
        <Button type="submit" variant="primary" className="form-control">
          Masuk
        </Button>
        <div className="text-center text-sm text-neutral/70 mt-1">
          Belum punya akun?{' '}
          <Link
            to={`/mobile/register?homeUrl=${homeUrl}`}
            className="btn-link normal-case"
            replace
          >
            Daftar
          </Link>
        </div>
        <div className="divider">atau</div>
        <Button onClick={loginGoogle}>Masuk dengan Google</Button>
      </form>
    </div>
  )
}

export default LoginMobilePage
