import { useAtom } from "jotai"
import { capitalize } from "lodash-es"
import { NavLink } from "react-router-dom"
import { BestThree } from "../containers/BestThree"
import { Day } from "../containers/Day"
import { WeekMenu } from "../containers/WeekMenu"
import { diaryAtom } from "../state"

interface LinkProps {
  to: string
  text: string
  class: string
}

function Link(p: LinkProps) {
  return (
    <NavLink to={p.to} className="w-full">
      <div className={`w-full px-8 py-8 rounded-4xl relative text-2xl text-center mb-10 ${p.class}`}>
        {p.text}
        <br />
        →
      </div>
    </NavLink>
  )
}

export function Home() {
  const [diary] = useAtom(diaryAtom)
  const name = capitalize(diary?.kid.name || "...")
  const formattedDate = new Date().toLocaleDateString("it-IT", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  const lastPage = diary?.pages.slice(-1)[0]

  return (
    <>
      <div className="text-left text-3xl font-bold w-full">Il diario di {name}</div>
      <div className="text-left text-sm tracking-widest mb-9 font-light w-full">{formattedDate}</div>
      <Day page={lastPage} />
      <BestThree name={name} />
      <Link to="/diary" text="La classifica generale dei piatti" class="bg-cyan-500" />
      <Link to="/week" text="Come va l'appetito?" class="bg-yellow-400" />
      <WeekMenu />
    </>
  )
}