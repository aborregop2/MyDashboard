import { Button } from "primereact/button"
import { useNavigate } from "react-router"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-primary text-black">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-gray-600">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button
          label="Go to Login"
          icon="pi pi-sign-in"
          className="p-button-primary"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  )
}

