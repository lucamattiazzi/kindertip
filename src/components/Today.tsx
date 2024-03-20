import { DiaryPage } from "../lib/types";

interface TodayProps {
  page: DiaryPage
}

export function Today(p: TodayProps) {
  console.log(p)
  return (
    <div className="flex flex-col items-start w-full px-8 py-10 bg-pink-600 rounded-3xl">
      <div className="text-left text-xl mb-4">Com'è andata oggi?</div>
      <div className="flex flex-col w-full">
        {p.page.food.map(f => (
          <>
            <div key={f.name} className="flex items-center justify-between w-full mb-3 text-offwhite">
              <div className="text-left text-sm font-light">{f.name}</div>
              <div className="text-right text-sm font-light">{f.text}</div>
            </div>
          </>
        ))}

      </div>
      <div className="text-left text-sm mb-9 font-light">{p.page.date}</div>
      <div className="text-left text-sm mb-9 font-light">{p.page.food.map(f => `${f.course} - ${f.name} - ${f.quantity}`).join(", ")}</div>
    </div>
  )
}