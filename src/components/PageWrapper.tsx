import { useAtom } from "jotai"
import { ReactNode } from "react"
import { infoAtom } from "../state"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Info } from "./Info"

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper(p: PageWrapperProps) {
  const [info] = useAtom(infoAtom)
  return (
    <div className={`w-full h-full flex flex-col justify-between items-center ${info ? 'overflow-hidden' : ''}`}>
      <Header />
      {p.children}
      <Footer />
      { info && <Info />}
    </div>
  )
}