
import { use } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuthError } from "@/store/stores";

//import '../App.css';

type Inputs = {
    user: string;
    password: string;
};

export default function LogIn({ darkMode }: { darkMode: boolean }) {
    const { register, handleSubmit, formState: { errors }} = useForm<Inputs>({ mode: "onBlur" });
    const { error, setError } = useAuthError();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            // Construir URL con parámetros de búsqueda
            const url = new URL('http://localhost:3000/users');
            url.searchParams.append('email', data.user);
            url.searchParams.append('password', data.password);
    
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) throw new Error('Error del servidor');
            
            const users = await response.json();
            
            if (users.length > 0) {
                navigate("/dashboard");
            } else {
                console.error('Error:', 'The user does not exist');
                setError("The user does not exist");
            }
        } catch (error) {
            console.error('Error:', error);
            setError("The user does not exist");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`max-w-md p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
            <div className="mb-6">

                <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Email
                </label>
                <input
                    placeholder="Email"
                    {...register("user", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Not an email",
                        },
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                    }`}
                />
                {errors.user && (
                    <span className="text-red-500 text-sm italic mt-2 block">{errors.user.message}</span>
                )}

            </div>

            <div className="mb-6">

                <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Password
                </label>
                <input
                    {...register("password", {
                        required: "Password is required",
                        validate: (value) => {
                            if (value.length !== 4) return "Password must be 4 digits";
                            if (!/^\d+$/.test(value)) return "Password must be a number";
                            return true;
                        },
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                    }`}
                    type="password"
                />
                {errors.password && (
                    <span className="text-red-500 text-sm italic mt-2 block">{errors.password.message}</span>
                )}

            </div>

            <div className="flex justify-center">
                <input
                    type="submit"
                    className={`px-8 py-2 rounded-lg transition-colors cursor-pointer font-semibold ${
                        darkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm italic mt-4 text-center">
                    <p>{error}</p>
                    
                </div>
            )}
        </form>
    );
}