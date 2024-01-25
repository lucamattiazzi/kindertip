import { capitalize } from "lodash-es"
import { Diary } from "../lib/types"

interface ListProp {
  goToDiary: () => void
  goToTrend: () => void
  goToWeek: () => void
  diary?: Diary
}

export function Home(p: ListProp) {
  const name = capitalize(p.diary?.kid.name || "...")
  return (
    <>
      <div className="text-center text-3xl mb-9">Diario di {name}</div>
      <div className="flex flex-col items-start w-full px-8 text-xl">
        <div className="flex items-center justify-center mb-5">
          <div className="pointer" onClick={p.goToDiary}>📋 - Guarda la <b>classifica piatti</b></div>
        </div>
        <div className="flex items-center justify-center mb-5">
          <div className="pointer" onClick={p.goToTrend}>📈 - Guarda il <b>trend pasti</b></div>
        </div>
        <div className="flex items-center justify-center">
          <div className="pointer" onClick={p.goToWeek}>📅 - Guarda la <b>settimana pasti</b></div>
        </div>
        <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 my-16"/>
        <div className="flex items-center justify-center mb-5">
          <a href="mailto:l.d.mattiazzi@gmail.com?subject=KinderTip" target="_blank">📧 - Contattami</a>
        </div>
        <a href="https://github.com/lucamattiazzi/kindertip" target="_blank" className="flex items-center justify-center mb-5">
          <img width="18" height="18" src="/github.png" /><span>&nbsp;- Guarda il codice</span>
        </a>
      </div>
    </>
  )
}