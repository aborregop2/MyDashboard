import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import UsersTable from "./pages/UsersTable";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./layouts/Layout";
import { useAuthStore, useDarkmodeStore } from "./store";

const savedDarkMode = localStorage.getItem('darkMode');
const prefersDarkMode = savedDarkMode !== null 
  ? savedDarkMode === 'true'
  : window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkMode) {
  import('../public/dark-blue.css');
  localStorage.setItem('theme', 'dark');
} else {
  import('../public/light-blue.css');
  localStorage.setItem('theme', 'light');
}

function App() {

  const {user} = useAuthStore();
  const {isDarkmode} = useDarkmodeStore();
  console.log(user)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />} />
          
        <Route element={<ProtectedRoute/>} >
          <Route element={<Layout/>} >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users_panel" element={<UsersTable />} />
          </Route>
        </Route>
      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;