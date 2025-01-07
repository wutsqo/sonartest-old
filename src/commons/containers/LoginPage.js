import React from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { Button, InputField } from 'commons/components'
import { useAuth } from 'commons/auth'
import { Controller, useForm } from 'react-hook-form'

const LoginPage = () => {
  const { control, handleSubmit } = useForm()
  const { isAuth, loginGoogle, loginPassword } = useAuth()
  const { state } = useLocation()
  const navigate = useNavigate()

  const loginWithPassword = data => {
    loginPassword(data)
    navigate(state)
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className="h-full bg-base-200 grid place-items-center py-16 px-6">
      <div className="prose w-full max-w-md">
        <h1>Log in</h1>
        <div className="card flex-shrink-0 w-full shadow-2xl bg-white">
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
                to="/forgot-password"
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
              <Link to="/register" className="btn-link normal-case">
                Daftar
              </Link>
            </div>
            <div className="divider">atau</div>
            <Button onClick={loginGoogle}>Masuk dengan Google</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
