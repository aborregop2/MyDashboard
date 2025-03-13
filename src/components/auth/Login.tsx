import React, { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { useAuthStore, useInLogin } from "../../store/index"
import { useNavigate } from "react-router"
import { Toast } from 'primereact/toast';



type LoginFormData = {
  email: string
  password: string
  rememberMe: boolean
}

const LoginForm: React.FC = () => {
  const { setIsAuth } = useAuthStore()
  const { setInLogin } = useInLogin()

  const [ showPassword, setShowPassword ] = useState(false)
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const navigate = useNavigate()
  const toast = useRef<Toast>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      rememberMe: false,
    },
    mode: "onBlur",
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)

    try {
      const responseGET = await fetch("http://localhost:3000/users")
      if (!responseGET.ok) throw new Error('Failed to fetch users')
      
      const dataGET = await responseGET.json()
      const user = dataGET.find(
        (user: { email: string; password: string }) =>
          user.email === data.email && user.password === data.password
      );

      if (!user) {
        setIsSubmitting(false);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid email or password',
          life: 3000
        });
        return;
      }

      setIsSubmitting(false);
      setIsAuth(true)
      
      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Welcome! :-)',
        life: 2000
      });
      
      //navigate("/dashboard")

    } catch (error) {
      console.error("Login failed:", error)
      setIsSubmitting(false)
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Login failed. Please try again.',
        life: 3000
      });
    }
  }
  
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <Toast ref={toast} position="top-right"/>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
          <p className="text-center text-gray-600 mt-1">Sign in to your account</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${errors.email ? "text-red-600" : "text-gray-700"}`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                className={`w-full px-3 py-2 border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium ${errors.password ? "text-red-600" : "text-gray-700"}`}
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={errors.password ? "true" : "false"}
                  className={`w-full px-3 py-2 border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
            </div>

            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                {...register("rememberMe")}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
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
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          
        </div>

        <div className="p-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a className="text-blue-600 font-medium hover:cursor-pointer" onClick={() => setInLogin(false)}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm

