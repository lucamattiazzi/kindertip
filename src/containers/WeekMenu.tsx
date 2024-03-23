import { useAtom } from "jotai"
import { useState } from "react"
import { getEmoji, getRatingEmoji } from "../lib/emoji"
import { getCurrentWeekMenu } from "../lib/menu"
import { bestFoodsAtom } from "../state"

const DAYS = {
  mon: "Lunedì",
  tue: "Martedì",
  wed: "Mercoledì",
  thu: "Giovedì",
  fri: "Venerdì",
}

export function WeekMenu() {
  const [bestFoods] = useAtom(bestFoodsAtom)
  const [delta, setDelta] = useState(0)
  const currentMenu = getCurrentWeekMenu(delta)
  const days = Object.keys(currentMenu.week) as Array<keyof typeof currentMenu.week>
  const currentWeekDay = new Date().toLocaleDateString("en-US", { weekday: "short" }).toLowerCase() as keyof typeof currentMenu.week
  return (
    <div className="flex flex-col items-start w-full px-8 py-8 bg-lime-600 rounded-4xl relative mb-4">
      <div className="text-left text-2xl z-10 text-offwhite">Menu settimanale</div>
      <div className="text-left mb-6 z-10 text-offwhite">da {currentMenu.from} a {currentMenu.to}</div>
      <div className="w-full text-center mb-4 z-10 text-offwhite text-2xl">
        <span className={`mr-4 ${delta > 0 ? "" : "text-white/20"}`} onClick={() => delta > 0 && setDelta(delta-1)}>←</span>
        <span onClick={() => setDelta(delta+1)}>→</span>
      </div>
      <div className="flex flex-col w-full z-10">
        {days.map(d => (
          <div key={d} className={`flex flex-col w-full mb-4 text-sm ${d === currentWeekDay ? "" : "opacity-60"}`}>
            <div className="text-left font-bold mb-3">{DAYS[d]}</div>
            {
              currentMenu.week[d].filter(Boolean).map(m => (
                <div className="flex justify-between" key={m}>
                  <span>{getRatingEmoji(bestFoods, m)} - {m}</span>
                  <span>{getEmoji(m)}</span>
                </div>
              ))
            } 
          </div>
        ))}
      </div>
    </div>
  )
}