import Login from "../components/auth/Login"
import Register from "../components/auth/Register"
import { useInLogin } from "../store/index"

export default function Authentication() {
  const { inLogin } = useInLogin()

  return (
    <>
      {inLogin ? <Login /> : <Register />}
    </>
  )
}