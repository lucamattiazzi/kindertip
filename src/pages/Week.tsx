import { AgCartesianAxisOptions, AgCartesianSeriesOptions, AgChartOptions } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import { useAtom } from 'jotai'
import { groupBy, sum, uniqBy } from "lodash-es"
import { weekNumber } from 'weeknumber'
import { Header } from '../components/Header'
import { GIORNI } from '../lib/constants'
import { MarkerWithError } from '../lib/markers'
import { quantityToVote } from "../lib/utils"
import { diaryAtom } from '../state'

interface DayData {
  day: string
  [key: string]: number | string
}

const DAY_SCATTER_SERIES: AgCartesianSeriesOptions[] = [
  {
    type: 'scatter',
    xKey: "day",
    yKey: "avg",
    marker: { size: 12, shape: MarkerWithError }
  }
]

const DAY_SCATTER_AXES: AgCartesianAxisOptions[] = [
  { type: "category", position: "bottom", title: { text: "Giorno" } },
  { type: "number", position: "left", title: { text: "Media" }},
]

export function Week() {
  const [diary] = useAtom(diaryAtom)

  const weekData = diary!.pages
    .filter(p => p.food.length > 0)
    .map(p => {
      const average = sum(p.food.map(f => quantityToVote(f.quantity))) / p.food.length
      const date = new Date(p.date)
      const week = weekNumber(date)
      const weekName = `${date.getFullYear()}-${String(week).padStart(2, '0')}`
      return { date, average, week: weekName }
    })
  
  const grouped = groupBy(weekData, v => v.date.getDay())
  const dayData = Object.values(grouped).map<DayData>((day, idx) => {
    const points = day.map(d => [d.week, d.average])
    const pointsObj = Object.fromEntries(points)
    return { ...pointsObj, day: GIORNI[idx] }
  })
  
  const weeks = uniqBy(weekData, v => v.week).map(v => v.week)
  const weekSeries: AgCartesianSeriesOptions[] = weeks.map(week => ({ type: 'line', xKey: "day", yKey: week }))
  const weekOptions: AgChartOptions = { data: dayData, series: weekSeries }

  const dayScatterData = dayData.map((d) => {
    const { day, ...values } = d
    const allValues = Object.values(values) as number[]
    const avg = sum(allValues) / allValues.length
    const sdev = Math.sqrt(sum(allValues.map(v => (v - avg) ** 2)) / allValues.length)
    return { day, avg, sdev }
  })
  const dayScatterOptions: AgChartOptions = { data: dayScatterData, series: DAY_SCATTER_SERIES, axes: DAY_SCATTER_AXES }

  return (
    <>
      <Header component="week" />
      <div className="flex flex-col w-full">

        <div className="text-xl font-bold text-center mb-2">Tutte le settimane</div>
        <div className="flex flex-col justify-between mb-6 pointer-events-none">
          <AgChartsReact options={weekOptions} />
        </div>

        <div className="text-xl font-bold text-center mb-2">Media giorno per giorno</div>
        <div className="flex flex-col justify-between mb-6 pointer-events-none">
          <AgChartsReact options={dayScatterOptions} />
        </div>
      </div>
    </>
  )
}
