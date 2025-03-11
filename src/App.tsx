import './App.css'

import { create } from 'zustand'
import Dashboard from './pages/Dashboard.tsx';
import LogIn from './pages/LogIn.tsx';



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
  const { loged, toggle } = useDashboard();
  const { darkMode, toggleTheme } = useTheme();

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
        <LogIn darkMode={darkMode}/>
      ) : (
        <Dashboard darkMode={darkMode} />
      )}
    </div>
    </>
        
  );
}