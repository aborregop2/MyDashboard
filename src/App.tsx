import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Topbar from "./components/Topbar";

function App() {
  return (
    <>
    <BrowserRouter>
      <Topbar/>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/dashboard" element= {

          //<ProtectedRoute>
            <Dashboard />
          //</ProtectedRoute>

        } 
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;