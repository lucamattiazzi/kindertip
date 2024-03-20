import { AgChartsReact } from 'ag-charts-react'
import { useAtom } from 'jotai'
import { groupBy, sum } from "lodash-es"
import { useState } from 'react'
import Select from 'react-select'
import { Header } from '../components/Header'
import { BASE_OPTIONS, GROUPERS, SELECT_OPTIONS, TITLE_BUILDERS } from "../lib/trendHelpers"
import { quantityToVote } from "../lib/utils"
import { diaryAtom } from '../state'

export function Trend() {
  const [groupType, setGroupType] = useState<"week" | "month" | "year">("month")
  const [diary] = useAtom(diaryAtom)

  const sparklineValues = diary!.pages
    .filter(p => p.food.length > 0)
    .map(p => {
      const average = sum(p.food.map(f => quantityToVote(f.quantity))) / p.food.length
      const date = new Date(p.date)
      return { date, average }
    })

  const grouper = GROUPERS[groupType]
  const grouped = groupBy(sparklineValues, v => grouper(v.date))
  
  return (
    <>
      <Header />
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
              <div className="flex flex-col justify-between mb-4 pointer-events-none" key={date}>
                <div className="text-lg">{title}</div>
                <AgChartsReact options={options} />
              </div>
            )
          })
        }

      </div>
    </>
  )
}
