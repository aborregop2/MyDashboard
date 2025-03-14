import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { Toast } from 'primereact/toast';
import { useAuthStore, useInLogin, useDarkmodeStore } from "../../store"
import { useNavigate } from "react-router"

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const { setIsAuth } = useAuthStore()
  const { setInLogin } = useInLogin()
  const { isDarkmode } = useDarkmodeStore()
  const toast = useRef<Toast>(null);

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: "onBlur",
  })

  const password = watch("password")

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const responseGET = await fetch("http://localhost:3000/users")
      const users = await responseGET.json()
      console.log(users)

      const userExists = users.find((user: any) => user.email === data.email)
      if (userExists) {
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'User already exists. Please log in.',
          life: 3000
        })
        setIsSubmitting(false)
        console.log('User already exists')
        return
      }

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Registration successful!',
        life: 2000
      })
      
      setIsSubmitting(false)
      setIsAuth(true)
      navigate("/dashboard")
    } catch (error) {
      setIsSubmitting(false)

      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error instanceof Error ? error.message : 'Registration error. Please try again.',
        life: 3000
      })
    }
  }

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 py-8 ${isDarkmode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-md rounded-xl shadow-lg overflow-hidden ${isDarkmode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`p-6 border-b ${isDarkmode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-2xl font-bold text-center ${isDarkmode ? 'text-white' : 'text-gray-900'}`}>Create an Account</h2>
          <p className={`text-center mt-1 ${isDarkmode ? 'text-gray-400' : 'text-gray-500'}`}>Fill in your details to get started</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className={`block text-sm font-medium ${errors.firstName ? "text-red-600" : isDarkmode ? "text-gray-300" : "text-gray-700"}`}
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  placeholder="John"
                  aria-invalid={errors.firstName ? "true" : "false"}
                  className={`w-full px-3 py-2 border ${errors.firstName ? "border-red-500 focus:ring-red-500" : isDarkmode ? "border-gray-600 focus:ring-blue-500 bg-gray-700 text-white" : "border-gray-300 focus:ring-blue-500 bg-white text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-600 text-xs mt-1" role="alert">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className={`block text-sm font-medium ${errors.lastName ? "text-red-600" : isDarkmode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  placeholder="Doe"
                  aria-invalid={errors.lastName ? "true" : "false"}
                  className={`w-full px-3 py-2 border ${errors.lastName ? "border-red-500 focus:ring-red-500" : isDarkmode ? "border-gray-600 focus:ring-blue-500 bg-gray-700 text-white" : "border-gray-300 focus:ring-blue-500 bg-white text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-xs mt-1" role="alert">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${errors.email ? "text-red-600" : isDarkmode ? "text-gray-300" : "text-gray-700"}`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                className={`w-full px-3 py-2 border ${errors.email ? "border-red-500 focus:ring-red-500" : isDarkmode ? "border-gray-600 focus:ring-blue-500 bg-gray-700 text-white" : "border-gray-300 focus:ring-blue-500 bg-white text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${errors.password ? "text-red-600" : isDarkmode ? "text-gray-300" : "text-gray-700"}`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={errors.password ? "true" : "false"}
                  className={`w-full px-3 py-2 border ${errors.password ? "border-red-500 focus:ring-red-500" : isDarkmode ? "border-gray-600 focus:ring-blue-500 bg-gray-700 text-white" : "border-gray-300 focus:ring-blue-500 bg-white text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className={`absolute right-0 top-0 h-full px-3 py-2 ${isDarkmode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} focus:outline-none`}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1" role="alert">
                  {errors.password.message}
                </p>
              )}
              {password && !errors.password && (
                <div className="space-y-1">
                  <div className="flex gap-1 mt-1">
                    <div
                      className={`h-1 flex-1 rounded-full ${password.length >= 8 ? "bg-green-500" : isDarkmode ? "bg-gray-600" : "bg-gray-200"}`}
                    ></div>
                    <div
                      className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(password) ? "bg-green-500" : isDarkmode ? "bg-gray-600" : "bg-gray-200"}`}
                    ></div>
                    <div
                      className={`h-1 flex-1 rounded-full ${/[0-9]/.test(password) ? "bg-green-500" : isDarkmode ? "bg-gray-600" : "bg-gray-200"}`}
                    ></div>
                    <div
                      className={`h-1 flex-1 rounded-full ${/[^A-Za-z0-9]/.test(password) ? "bg-green-500" : isDarkmode ? "bg-gray-600" : "bg-gray-200"}`}
                    ></div>
                  </div>
                  <p className={`text-xs ${isDarkmode ? "text-gray-400" : "text-gray-500"}`}>
                    Strong passwords have at least 8 characters, uppercase, numbers, and symbols
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className={`block text-sm font-medium ${errors.confirmPassword ? "text-red-600" : isDarkmode ? "text-gray-300" : "text-gray-700"}`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  className={`w-full px-3 py-2 border ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : isDarkmode ? "border-gray-600 focus:ring-blue-500 bg-gray-700 text-white" : "border-gray-300 focus:ring-blue-500 bg-white text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  className={`absolute right-0 top-0 h-full px-3 py-2 ${isDarkmode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} focus:outline-none`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1" role="alert">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        <div className={`p-6 border-t ${isDarkmode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
          <p className={`text-sm ${isDarkmode ? 'text-gray-400' : 'text-gray-500'}`}>
            Already have an account?{" "}
            <a className="text-blue-600 font-medium hover:cursor-pointer" onClick={() => setInLogin(true)}>
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register