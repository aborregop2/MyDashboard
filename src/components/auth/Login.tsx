import { useState, useRef, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { Toast } from "primereact/toast"
import MyInput from "../ui/MyInput"
import MyButton from "../ui/MyButton"
import MyCheckbox from "../ui/MyCheckbox"
import { classNames } from "primereact/utils"
import { useAuthStore, useInLogin } from "../../store"
import { useNavigate } from "react-router"
import { Eye, EyeOff } from "lucide-react"
import { fetchUsers } from "../../services/useUsersApi"
import { useShowSidebar } from "../../store"

type LoginFormData = {
  email: string
  password: string
  rememberMe: boolean
}

const Login = () => {
  const { setUser } = useAuthStore()
  const { setInLogin } = useInLogin()
  const { setShowSidebar } = useShowSidebar()
  const toast = useRef<Toast>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)

    try {
      
      const users = await fetchUsers();
      const user = users.find(
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
      setUser({
        email: user.email,
        role: user.role,
      })

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Welcome! :-)",
        life: 2000,
      })

      setShowSidebar(false)
      console.log("Login successful")
      console.log("User:", user)
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

  const getFormErrorMessage = (name: keyof LoginFormData) => {
    return errors[name] ? <small className="p-error text-red-600 text-xs mt-1">{errors[name]?.message}</small> : null
  }

  return (
    <>
      <Toast ref={toast} position="top-right" />

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-center mt-1">Sign in to your account</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <a href="#" className="text-sm text-blue-500 hover:text-blue-400">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {getFormErrorMessage("password")}
            </div>

            <div className="flex items-center">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center">
                    <MyCheckbox
                      inputId={field.name}
                      checked={field.value}
                      onChange={(e : any) => field.onChange(e.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={field.name} className="text-sm">
                      Remember me
                    </label>
                  </div>
                )}
              />
            </div>

            <MyButton
              type="submit"
              label={isSubmitting ? "Signing in..." : "Sign In"}
              className="w-full mt-6"
              disabled={isSubmitting}
            />
          </form>
        </div>

        <div className="p-6 border-t text-center border-gray-200">
          <p className="text-sm">
            Don't have an account?{" "}
            <a
              className="text-blue-500 font-medium hover:cursor-pointer hover:text-blue-400"
              onClick={() => setInLogin(false)}
            >
              Create an account
            </a>
          </p>
        </div>
    </>
  )
}

export default Login

