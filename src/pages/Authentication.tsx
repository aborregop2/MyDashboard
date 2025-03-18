import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { useDarkmodeStore, useInLogin } from "../store/index";

export default function Authentication() {
  const { inLogin } = useInLogin();
  const { isDarkmode } = useDarkmodeStore();

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 py-8 ${
        isDarkmode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {inLogin ? <Login /> : <Register />}
    </div>
  );
}