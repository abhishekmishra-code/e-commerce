import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../common/Input'
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import Button from '../common/Button'
import { Link, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/slices/authSlice'
import { toast } from 'react-toastify'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser(data))

    if (registerUser.fulfilled.match(result)) {
      console.log('✅ User registered:', result.payload)
      toast(`Account created successfully! Welcome, ${result.payload.name}`)
      navigate('/')
    } else {
      console.error('❌ Registration failed:', result.error.message)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
          Signup for your account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto space-y-4"
        >
          <Input
            label="Fullname"
            name="name"
            type="text"
            placeholder="First Name Middle Name Last Name"
            leftIcon={UserCircleIcon}
            helper="We'll never share your email."
            error={errors.name?.message}
            {...register('name', {
              required: 'Name is required',
              pattern: {
                value: /^[a-z ,.'-]+$/i,
                message: 'Enter a valid name',
              },
            })}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            leftIcon={EnvelopeIcon}
            helper="We'll never share your email."
            error={errors.email?.message}
            register={register}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••"
            leftIcon={LockClosedIcon}
            showPasswordToggle
            helper="Must be 8+ characters"
            error={errors.password?.message}
            register={register}
            required
            className={`appearance-none block w-full px-3 py-2 border 'border-gray-300' rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />

          <Button
            type="submit"
            size="md"
            variant="primary"
            loading={isSubmitting}
            className="w-full"
          >
            Sign Up
          </Button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline hover:text-indigo-500 dark:text-indigo-400"
          >
            Log In
          </Link>
        </p>
      </div>
    </main>
  )
}

export default SignUp
