"use client"

import { useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { Toast } from "primereact/toast"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { classNames } from "primereact/utils"
import { useAuthStore, useInLogin, useDarkmodeStore } from "../../store"
import { useNavigate } from "react-router"
import { Eye, EyeOff } from "lucide-react"

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const { setUser } = useAuthStore()
  const { setInLogin } = useInLogin()
  const { isDarkmode } = useDarkmodeStore()
  const toast = useRef<Toast>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const {
    control,
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
      const userExists = users.find((user: any) => user.email === data.email)
      if (userExists) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "User already exists. Please log in.",
          life: 3000,
        })
        setIsSubmitting(false)
        return
      }

      // Create the new user
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: "user" }),
      })

      if (!response.ok) {
        throw new Error("Failed to create user")
      }

      // Get the created user directly from the response
      const newUser = await response.json()
      console.log(newUser)
      console.log(response)
      // Set user state directly
      setUser({
        email: data.email,
        role: "user",
      })

      setIsSubmitting(false)
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Registration successful!",
        life: 2000,
      })

      // Navigate after state is set
      navigate("/dashboard")
    } catch (error) {
      setIsSubmitting(false)
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error instanceof Error ? error.message : "Registration error. Please try again.",
        life: 3000,
      })
    }
  }

  const getFormErrorMessage = (name: keyof FormData) => {
    return errors[name] ? <small className="p-error">{errors[name]?.message}</small> : null
  }

  // Password strength indicator
  const PasswordStrengthIndicator = ({ password }: { password: string }) => (
    <div className="p-2">
      <h6>Password Strength</h6>
      <div className="flex gap-1 mt-2">
        <div className={`h-1 flex-1 rounded-full ${password?.length >= 8 ? "bg-green-500" : "bg-gray-200"}`}></div>
        <div
          className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(password || "") ? "bg-green-500" : "bg-gray-200"}`}
        ></div>
        <div
          className={`h-1 flex-1 rounded-full ${/[0-9]/.test(password || "") ? "bg-green-500" : "bg-gray-200"}`}
        ></div>
        <div
          className={`h-1 flex-1 rounded-full ${/[^A-Za-z0-9]/.test(password || "") ? "bg-green-500" : "bg-gray-200"}`}
        ></div>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Strong passwords have at least 8 characters, uppercase, numbers, and symbols
      </p>
    </div>
  )

  // Card header
  const header = (
    <div className="text-center p-3">
      <h2 className="text-2xl font-bold">Create an Account</h2>
      <p className="mt-1 text-gray-500">Fill in your details to get started</p>
    </div>
  )

  // Card footer
  const footer = (
    <div className="text-center p-3">
      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <a className="text-blue-600 font-medium cursor-pointer" onClick={() => setInLogin(true)}>
          Login here
        </a>
      </p>
    </div>
  )

  return (
    <div className={`flex items-center justify-center min-h-screen p-4 ${isDarkmode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Toast ref={toast} />

      <Card className="w-full max-w-md shadow-lg" header={header} footer={footer}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <span className="p-float-label">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "First name is required" }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className={classNames({ "p-invalid": fieldState.error })} />
                  )}
                />
                <label htmlFor="firstName">First Name</label>
              </span>
              {getFormErrorMessage("firstName")}
            </div>

            <div>
              <span className="p-float-label">
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Last name is required" }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className={classNames({ "p-invalid": fieldState.error })} />
                  )}
                />
                <label htmlFor="lastName">Last Name</label>
              </span>
              {getFormErrorMessage("lastName")}
            </div>
          </div>

          <div className="mb-4">
            <span className="p-float-label">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field, fieldState }) => (
                  <InputText id={field.name} {...field} className={classNames({ "p-invalid": fieldState.error })} />
                )}
              />
              <label htmlFor="email">Email</label>
            </span>
            {getFormErrorMessage("email")}
          </div>

          <div className="mb-4">
            <span className="p-float-label relative">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className={classNames({ "p-invalid": fieldState.error })}
                  />
                )}
              />
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </span>
            {getFormErrorMessage("password")}
            {password && <PasswordStrengthIndicator password={password} />}
          </div>

          <div className="mb-4">
            <span className="p-float-label relative">
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    className={classNames({ "p-invalid": fieldState.error })}
                  />
                )}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </span>
            {getFormErrorMessage("confirmPassword")}
          </div>

          <Button
            type="submit"
            label={isSubmitting ? "Creating account..." : "Create Account"}
            icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-user-plus"}
            className="w-full"
            loading={isSubmitting}
          />
        </form>
      </Card>
    </div>
  )
}

export default Register

