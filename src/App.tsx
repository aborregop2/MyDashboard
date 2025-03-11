
import Dashboard from './pages/Dashboard.tsx';
import LogIn from './pages/LogIn.tsx';
import DarkModeButton from './components/ui/DarkModeButton.tsx';

import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';


import { useDarkModeStore } from './store/stores.tsx';
import ProtectedRoute from './components/ui/ProtectedRoute.tsx';



export default function App() {
  const { darkMode, toggleTheme } = useDarkModeStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LogIn darkMode={darkMode} />} />
        <Route path="/login" element={<LogIn darkMode={darkMode}/>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard darkMode={darkMode}/>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}