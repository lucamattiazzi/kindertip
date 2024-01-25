import { AgChartsReact } from 'ag-charts-react'
import { groupBy, sum } from "lodash-es"
import { useState } from 'react'
import Select from 'react-select'
import { BASE_OPTIONS, GROUPERS, SELECT_OPTIONS, TITLE_BUILDERS } from "../lib/trendHelpers"
import { Diary } from "../lib/types"
import { quantityToVote } from "../lib/utils"

interface TrendProps {
  diary?: Diary
}

export function Trend(p: TrendProps) {
  const [groupType, setGroupType] = useState<"week" | "month" | "year">("month")

  if (!p.diary) return null

  const sparklineValues = p.diary.pages
    .filter(p => p.food.length > 0)
    .map(p => {
      const average = sum(p.food.map(f => quantityToVote(f.quantity))) / p.food.length
      const date = new Date(p.date)
      return { date, average }
    })

  const grouper = GROUPERS[groupType]
  const grouped = groupBy(sparklineValues, v => grouper(v.date))
  
  return (
    <div className="flex flex-col w-full">
      <div className="text-xl font-bold text-center">Trend per: </div>
      <Select
        options={SELECT_OPTIONS}
        defaultValue={SELECT_OPTIONS.find((f) => f.value === groupType)}
        onChange={(o) => setGroupType(o!.value)}
      />

      {
        Object.entries(grouped).map(([date, data]) => {
          const options = { ...BASE_OPTIONS, data }
          const title = TITLE_BUILDERS[groupType](date)
          return (
            <div className="flex flex-col justify-between mb-4" key={date}>
              <div className="text-lg">{title}</div>
              <AgChartsReact options={options} />
            </div>
          )
        })
      }

    </div>
  )
}
