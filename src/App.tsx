import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import UsersTable from "./pages/UsersTable";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./layouts/Layout";
import { useAuthStore } from "./store";
import NotFound from "./pages/NotFound";
import RedirectAuthenticatedRoute from "./routes/RedirectAuthenticatedRoute";


//TODO: NUNITO -OK
//TODO: BUG F5 -OK
//TODO: BUG404 -


const savedDarkMode = localStorage.getItem('theme');
const prefersDarkMode = savedDarkMode !== null 
  ? savedDarkMode === 'dark'
  : window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply theme to document and update localStorage
if (prefersDarkMode) {
  document.documentElement.classList.add('dark');
  import('../public/dark-blue.css');
  localStorage.setItem('theme', 'dark');
} else {
  document.documentElement.classList.remove('dark');
  import('../public/light-blue.css');
  localStorage.setItem('theme', 'light');
}

function App() {

  const {user} = useAuthStore();
  console.log(user)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<RedirectAuthenticatedRoute route="/dashboard" />} >
          <Route path="/" element={<Authentication />} />
        </Route>
        
        <Route element={<ProtectedRoute/>} >
          <Route element={<Layout/>} >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users_panel" element={<UsersTable />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;