import { useAtom } from "jotai"
import { Login } from "../containers/Login"
import { isLoggedAtom } from "../state"

interface LoginWrapperProps {
  component: () => JSX.Element
}

export function LoginWrapper(p: LoginWrapperProps) {
  const [isLogged] = useAtom(isLoggedAtom)
  return isLogged ? <p.component /> : <Login />
}