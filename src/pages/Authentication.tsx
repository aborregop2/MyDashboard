import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { useInLogin } from "../store/index";

export default function Authentication() {
  const { inLogin } = useInLogin();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-md rounded-xl shadow-lg overflow-hidden">
        {inLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
}