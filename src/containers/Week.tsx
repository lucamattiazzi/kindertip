import { AgCartesianSeriesOptions, AgChartOptions } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import { groupBy, sum, uniqBy } from "lodash-es"
import { weekNumber } from 'weeknumber'
import { GIORNI } from '../lib/constants'
import { Diary } from "../lib/types"
import { quantityToVote } from "../lib/utils"

interface WeekProps {
  diary?: Diary
}

export function Week(p: WeekProps) {
  if (!p.diary) return null

  const sparklineValues = p.diary.pages
    .filter(p => p.food.length > 0)
    .map(p => {
      const average = sum(p.food.map(f => quantityToVote(f.quantity))) / p.food.length
      const date = new Date(p.date)
      const week = weekNumber(date)
      const weekName = `${date.getFullYear()}-${String(week).padStart(2, '0')}`
      return { date, average, week: weekName }
    })
  
  const grouped = groupBy(sparklineValues, v => v.date.getDay())
  const dayData = Object.values(grouped).map((day) => {
    const points = day.map(d => [d.week, d.average])
    return Object.fromEntries(points)
  })
  const data = dayData.flatMap((d, i) => ({ ...d, day: GIORNI[i] }))
  const weeks = uniqBy(sparklineValues, v => v.week).map(v => v.week)
  const series: AgCartesianSeriesOptions[] = weeks.map(week => ({ type: 'line', xKey: "day", yKey: week }))
  const options: AgChartOptions = { data, series }
  
  return (
    <div className="flex flex-col w-full">
      <div className="text-xl font-bold text-center">Tutti i trend settimanali</div>
      <div className="flex flex-col justify-between mb-4">
        <AgChartsReact options={options} />
      </div>
    </div>
  )
}
