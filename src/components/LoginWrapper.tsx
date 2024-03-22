import { useAtom } from "jotai"
import { Login } from "../containers/Login"
import { diaryAtom, infoAtom } from "../state"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Info } from "./Info"

interface LoginWrapperProps {
  component: () => JSX.Element
}

export function LoginWrapper(p: LoginWrapperProps) {
  const [diary] = useAtom(diaryAtom)
  const [info] = useAtom(infoAtom)
  if (!diary) return <Login />
  return (
    <>
      <Header />
      <p.component />
      <Footer />
      { info && <Info />}
    </>
  )
}