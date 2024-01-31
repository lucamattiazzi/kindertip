import { useAtom } from "jotai"
import { diaryAtom } from "../state"
import { Login } from "./Login"

interface LoginWrapperProps {
  component: () => JSX.Element
}

export function LoginWrapper(p: LoginWrapperProps) {
  const [diary] = useAtom(diaryAtom)
  if (diary) return <p.component />
  return <Login />
}