import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../common/Input'
import Button from '../common/Button'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router'
import { loginUser } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data))

    if (loginUser.fulfilled.match(result)) {
      navigate('/')
      toast(`Hi ${result.payload.name}, you’ve successfully logged in!`)
    } else if (loginUser.rejected) {
      toast(result.payload)
    } else {
      console.error('❌ Log In failed:', result.error.message)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
          Login to your account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Email Field */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            leftIcon={EnvelopeIcon}
            helper="We'll never share your email."
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Enter a valid email address',
              },
            })}
            required
          />

          {/* Password Field */}
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            leftIcon={LockClosedIcon}
            showPasswordToggle
            helper="Minimum 8 characters"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="md"
            variant="primary"
            loading={isSubmitting}
            className="w-full"
          >
            Log In
          </Button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline hover:text-indigo-500 dark:text-indigo-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Login
