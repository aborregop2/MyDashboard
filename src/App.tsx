import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import UsersTable from "./pages/UsersTable";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./layouts/Layout";

//TODO: Put toasts

function App() {
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