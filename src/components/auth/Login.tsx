import type React from "react";
import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuthStore, useInLogin } from "../../store/index";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";
import { Eye, EyeOff } from "lucide-react";

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC = () => {
  const { setUser } = useAuthStore();
  const { setInLogin } = useInLogin();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useRef<Toast>(null);

  const navigate = useNavigate();

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
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    try {
      const responseGET = await fetch("http://localhost:3000/users");
      if (!responseGET.ok) throw new Error("Failed to fetch users");

      const dataGET = await responseGET.json();
      const user = dataGET.find(
        (user: { email: string; password: string }) =>
          user.email === data.email && user.password === data.password
      );

      if (!user) {
        setIsSubmitting(false);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Invalid email or password",
          life: 3000,
        });
        return;
      }

      setIsSubmitting(false);
      setUser({
        email: user.email,
        role: user.role,
      });

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Welcome! :-)",
        life: 2000,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setIsSubmitting(false);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Login failed. Please try again.",
        life: 3000,
      });
    }
  };

  const getFormErrorMessage = (name: keyof LoginFormData) => {
    return errors[name] ? (
      <small className="p-error text-red-600 text-xs mt-1">
        {errors[name]?.message}
      </small>
    ) : null;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />

      <div
        className={`w-full max-w-md rounded-xl shadow-lg overflow-hidden bg-white`}
      >
        <div className={`p-6 border-b`}>
          <h2 className={`text-2xl font-bold text-center`}>Welcome Back</h2>
          <p className={`text-center mt-1`}>Sign in to your account</p>
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
                  <InputText
                    type="email"
                    id={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="your.email@example.com"
                    className={classNames("w-full", {
                      "p-invalid": fieldState.error,
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
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
              </div>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field, fieldState }) => (
                  <div className="relative">
                    <InputText
                      id={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={classNames("w-full", {
                        "p-invalid": fieldState.error,
                      })}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                )}
              />
              {getFormErrorMessage("password")}
            </div>

            <div className="flex items-center">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center">
                    <Checkbox
                      inputId={field.name}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={field.name} className="text-sm">
                      Remember me
                    </label>
                  </div>
                )}
              />
            </div>

            <Button
              type="submit"
              label={isSubmitting ? "Signing in..." : "Sign In"}
              icon={isSubmitting ? "pi pi-spin pi-spinner" : ""}
              className="w-full mt-6"
              disabled={isSubmitting}
            />
          </form>
        </div>

        <div className={`p-6 border-t text-center`}>
          <p className="text-sm">
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
    </>
  );
};

export default LoginForm;
