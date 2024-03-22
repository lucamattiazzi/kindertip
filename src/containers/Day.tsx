import { CanvasWithShape } from "../components/CanvasWithShape";
import { DiaryPage } from "../lib/types";

interface DayProps {
  page?: DiaryPage
}

export function Day(p: DayProps) {
  if (!p.page) return null
  const { food } = p.page
  return (
    <div className="flex flex-col items-start w-full px-8 py-8 bg-pink-500 rounded-4xl relative mb-10">
      <CanvasWithShape />
      <div className="text-left text-2xl mb-6 z-10">Com'è andata oggi?</div>
      <div className="flex flex-col w-full z-10">
        {food.map((f, idx) => (
          <div key={f.name} className="flex items-center w-full flex-col">
            <div className="flex items-center justify-between w-full mb-3 text-offwhite">
              <div className="text-left text-sm tracking-widest font-light">{f.name}</div>
              <div className="text-right text-sm tracking-widest">{f.text}</div>
            </div>
            { idx !== food.length - 1 && <hr className="h-px w-full bg-pink-700 border-0 mb-3" /> }
          </div>
        ))}
      </div>
    </div>
  )
}