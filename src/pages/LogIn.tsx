
import { useForm, SubmitHandler } from "react-hook-form";




type Inputs = {
    user: string,
    password: string,
};

const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
const onSubmit: SubmitHandler<Inputs> = toggle;

console.log(watch()) // watch all inputs by passing nothing
console.log(watch("user")) // watch individual input by passing its name
console.log(watch("password")) // watch individual input by passing its name


export default function LogIn() {
    return (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`w-full max-w-md p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              User
            </label>
            <input
              defaultValue="test"
              {...register("user")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <input
              {...register("password", { required: true })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              aria-invalid={errors.password ? "true" : "false"}
              type='password'
            />
            {errors.password && (
              <span className="text-red-500 text-sm italic mt-2 block">
                This field is required
              </span>
            )}
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              className={`px-8 py-2 rounded-lg transition-colors cursor-pointer font-semibold ${darkMode ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            />
          </div>
        </form>
    )

}