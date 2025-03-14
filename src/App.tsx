import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./layouts/Layout";

//TODO: Put toasts

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>} >
          <Route path="/" element={<Authentication />} />
          <Route path="/auth" element={<Authentication />} />

          <Route element={<ProtectedRoute/>} >
            <Route path="/dashboard" element= {<Dashboard />} />
          </Route>

        </Route>
      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;