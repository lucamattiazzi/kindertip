import { useState } from "react"
import diary from "../static/diary.json"
import home from "../static/home.json"
import trend from "../static/trend.json"
import week from "../static/week.json"
import { Info } from "./Info"

const PAGES = { diary, home, trend, week }
interface HeaderProps {
  component: keyof typeof PAGES
}

export function Header(p: HeaderProps) {
  const [info, setInfo] = useState(false)
  const toggleInfo = () => setInfo(!info)
  return (
    <>
      { info && <Info toggleInfo={toggleInfo} info={PAGES[p.component]}/> }
      <div className="mb-10">
        <h1 className="text-3xl text-center font-bold mb-1">KinderTip</h1>
        <p className="px-6 text-xxs text-center">trasformare il diario di KinderTap in numeri e grafici.</p>
        <a className="absolute top-2 left-2 text-4xl" href="/">🏠</a>
        <div className="absolute top-2 right-2 cursor-pointer text-4xl" onClick={toggleInfo}>ℹ️</div>
      </div>
    </>
  )
}
