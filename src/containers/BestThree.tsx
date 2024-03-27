import { useAtom } from "jotai";
import { CanvasWithConfetti } from "../components/CanvasWithConfetti";
import { getEmoji } from "../lib/emoji";
import { bestFoodsAtom } from "../state";

interface DayProps {
  name: string
}

export function BestThree(p: DayProps) {
  const [bestFoods] = useAtom(bestFoodsAtom)
  const bestThree = bestFoods.slice(0, 3)
  return (
    <div className="flex flex-col items-start w-full px-8 py-8 bg-blue-600 rounded-4xl relative mb-10">
      <CanvasWithConfetti />
      <div className="text-left text-2xl mb-6 z-10 text-offwhite">I preferiti di {p.name}!</div>
      <div className="flex flex-col w-full z-10">
        {bestThree.map((f, idx) => (
          <div key={f.name} className="flex items-center justify-between w-full bg-blue-900 p-6 rounded-3xl mb-4 text-offwhite">
            <div className="flex items-center w-3/5">
              <div className="text-left font-bold text-3xl mr-3">{idx + 1}</div>
              <div className="tracking-wider">{f.name}</div>
            </div>
            <div className="text-right font-bold text-3xl">{getEmoji(f.name)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}