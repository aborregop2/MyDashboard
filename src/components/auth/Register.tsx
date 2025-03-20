import { useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { Toast } from "primereact/toast"
import MyInput  from "../ui/MyInput"
import MyButton from "../ui/MyButton"
import { classNames } from "primereact/utils"
import { useAuthStore, useInLogin } from "../../store"
import { useNavigate } from "react-router"
import { fetchUsers, createUser } from "../../services/useUsersApi"
import { Eye, EyeOff } from "lucide-react"
import { useShowSidebar } from "../../store"


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
  const { setShowSidebar } = useShowSidebar()
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
      const users = await fetchUsers()
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

      await createUser({ ...data, role: "user" })

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

      console.log("User created successfully")

      
      setShowSidebar(false)
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
    return errors[name] ? <small className="p-error text-red-600 text-xs mt-1">{errors[name]?.message}</small> : null
  }

  // Password strength indicator
  const PasswordStrengthIndicator = ({ password }: { password: string }) => (
    <div className="mt-2">
      <h6 className="text-sm font-medium">Password Strength</h6>
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

  return (
    <>
      <Toast ref={toast} position="top-right" />

      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <p className="text-center mt-1">Fill in your details to get started</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field, fieldState }) => (
                  <MyInput
                    id={field.name}
                    {...field}
                    placeholder="John"
                    className={classNames("w-full", { "p-invalid": fieldState.error })}
                  />
                )}
              />
              {getFormErrorMessage("firstName")}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field, fieldState }) => (
                  <MyInput
                    id={field.name}
                    {...field}
                    placeholder="Doe"
                    className={classNames("w-full", { "p-invalid": fieldState.error })}
                  />
                )}
              />
              {getFormErrorMessage("lastName")}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
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
                <MyInput
                  id={field.name}
                  {...field}
                  placeholder="your.email@example.com"
                  className={classNames("w-full", { "p-invalid": fieldState.error })}
                />
              )}
            />
            {getFormErrorMessage("email")}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="p-inputgroup">
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
                  <MyInput
                    id={field.name}
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={classNames("w-full", { "p-invalid": fieldState.error })}
                  />
                )}
              />
              <MyButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-button-outlined p-button-secondary"
                style={{ borderLeft: "none", borderColor: "#ced4da" }}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" aria-hidden="true" />
                )}
              </MyButton>
            </div>
            {getFormErrorMessage("password")}
            {password && <PasswordStrengthIndicator password={password} />}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="p-inputgroup">
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                }}
                render={({ field, fieldState }) => (
                  <MyInput
                    id={field.name}
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={classNames("w-full", { "p-invalid": fieldState.error })}
                  />
                )}
              />
              <MyButton
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-button-outlined p-button-secondary"
                style={{ borderLeft: "none", borderColor: "#ced4da" }}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" aria-hidden="true" />
                )}
              </MyButton>
            </div>
            {getFormErrorMessage("confirmPassword")}
          </div>

          <MyButton
            type="submit"
            label={isSubmitting ? "Creating account..." : "Create Account"}
            icon={isSubmitting ? "pi pi-spin pi-spinner" : ""}
            className="w-full mt-6"
            disabled={isSubmitting}
          />
        </form>
      </div>

      <div className="p-6 border-t text-center border-gray-200">
        <p className="text-sm">
          Already have an account?{" "}
          <a
            className="text-blue-500 font-medium hover:cursor-pointer hover:text-blue-400"
            onClick={() => setInLogin(true)}
          >
            Login here
          </a>
        </p>
      </div>
    </>
  )
}

export default Register

