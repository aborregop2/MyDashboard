"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { useAuthStore, useInLogin, useDarkmodeStore } from "../../store/index"
import { useNavigate } from "react-router"
import { Toast } from "primereact/toast"
import { Eye, EyeIcon as EyeClosed } from "lucide-react"

type LoginFormData = {
  email: string
  password: string
  rememberMe: boolean
}

const LoginForm: React.FC = () => {
  const { setIsAuth } = useAuthStore()
  const { setInLogin } = useInLogin()
  const { isDarkmode } = useDarkmodeStore()

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const toast = useRef<Toast>(null)

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
      if (!responseGET.ok) throw new Error("Failed to fetch users")

      const dataGET = await responseGET.json()
      const user = dataGET.find(
        (user: { email: string; password: string }) => user.email === data.email && user.password === data.password,
      )

      if (!user) {
        setIsSubmitting(false)
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Invalid email or password",
          life: 3000,
        })
        return
      }

      setIsSubmitting(false)
      setIsAuth(true)

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Welcome! :-)",
        life: 2000,
      })

      navigate("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      setIsSubmitting(false)
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Login failed. Please try again.",
        life: 3000,
      })
    }
  }

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 py-8 ${isDarkmode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Toast ref={toast} position="top-right" />
      <div
        className={`w-full max-w-md rounded-xl shadow-lg overflow-hidden ${isDarkmode ? "bg-gray-800" : "bg-white"}`}
      >
        <div className={`p-6 border-b ${isDarkmode ? "border-gray-700" : "border-gray-200"}`}>
          <h2 className={`text-2xl font-bold text-center ${isDarkmode ? "text-white" : "text-gray-800"}`}>
            Welcome Back
          </h2>
          <p className={`text-center mt-1 ${isDarkmode ? "text-gray-300" : "text-gray-600"}`}>
            Sign in to your account
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${errors.email ? "text-red-600" : isDarkmode ? "text-gray-200" : "text-gray-700"}`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                className={`w-full px-3 py-2 border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${isDarkmode ? "bg-gray-700 text-white border-gray-600" : ""}`}
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
                  className={`block text-sm font-medium ${errors.password ? "text-red-600" : isDarkmode ? "text-gray-200" : "text-gray-700"}`}
                >
                  Password
                </label>
              </div>
              <div className="relative">
                {/*
                TODO: LOGIN and REGISTER to Prime
                TODO: Navbar darker
                TODO: Hamburguesa logo topbar to show sidebar
                TODO: Roles admin y user + tabla de propiedades
                */}
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={errors.password ? "true" : "false"}
                  className={`w-full px-3 py-2 border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${isDarkmode ? "bg-gray-700 text-white border-gray-600" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  className={`absolute right-0 top-0 h-full px-3 py-2 ${isDarkmode ? "text-gray-300 hover:text-gray-100" : "text-gray-500 hover:text-gray-700"} focus:outline-none`}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
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
              <label
                htmlFor="rememberMe"
                className={`ml-2 block text-sm ${isDarkmode ? "text-gray-200" : "text-gray-700"}`}
              >
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
                  {/*TODO: Put an spinner component here */}
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

        <div className={`p-6 border-t ${isDarkmode ? "border-gray-700" : "border-gray-200"} text-center`}>
          <p className={`text-sm ${isDarkmode ? "text-gray-300" : "text-gray-600"}`}>
            Don't have an account?{" "}
            <a
              className="text-blue-500 font-medium hover:cursor-pointer hover:text-blue-400"
              onClick={() => setInLogin(false)}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm

