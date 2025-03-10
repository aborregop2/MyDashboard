import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

import { create } from 'zustand'
import { useForm, SubmitHandler } from "react-hook-form";
import Dashboard from './Dashboard.tsx';

type Inputs = {
  user: string,
  password: string,
};

type Logged = {
  loged: boolean,
  toggle: () => void,
};

type Theme = {
  darkMode: boolean,
  toggleTheme: () => void,
};

const useDashboard = create<Logged>((set) => ({
  loged: false,
  toggle: () => set((state) => ({ loged: !state.loged })),
}))

const useTheme = create<Theme>((set) => ({
  darkMode: false,
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
}))

export default function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const { loged, toggle } = useDashboard();
  const { darkMode, toggleTheme } = useTheme();

  const onSubmit: SubmitHandler<Inputs> = toggle;

  console.log(watch()) // watch all inputs by passing nothing
  console.log(watch("user")) // watch individual input by passing its name
  console.log(watch("password")) // watch individual input by passing its name

  return (
    <>
    <div className={`flex flex-col items-center min-h-screen py-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
    {loged && (
      <div className="absolute top-4 right-4">
        <button 
          onClick={toggle}
          className={`flex items-right gap-1 px-4 py-2 rounded-lg transition-all ${
        darkMode 
          ? 'bg-gray-700 text-red-400 hover:bg-gray-600' 
          : 'bg-blue-100 text-red-600 hover:bg-blue-200'
          }`}
        >
          Logout
        </button>
      </div>
    )}
      <div className="flex justify-between w-full max-w-md mb-4 px-6">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Tech Dashboard</h1>
        <button 
          onClick={toggleTheme} 
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-blue-100 text-gray-700'}`}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      

      {!loged ? (
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
      ) : (
        <Dashboard darkMode={ darkMode } />
      )}
    </div>
    </>
        
  );
}