import { AgCartesianAxisOptions, AgCartesianSeriesOptions, AgChartOptions } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { getDataByDay, getMovingAverageData, getWeekdayData } from '../lib/plotUtils'
import { formatDate } from '../lib/utils'
import { diaryAtom } from '../state'

const MOVING_AVERAGE_SERIES: AgCartesianSeriesOptions[] = [
  {
    type: "line",
    xKey: "date",
    yKey: "average",
  },
]

const MOVING_AVERAGE_AXES: AgCartesianAxisOptions[] = [
    {
      type: "category",
      position: "bottom",
      label: {
        formatter: params => {
          const date = new Date(params.value)
          const formatted = formatDate(date)
          return formatted.split("/").slice(1).join("/")
        }
      }
    },
    {
      type: "number",
      position: "left",
      min: 0,
      max: 10
    },
]


const DAY_SCATTER_SERIES: AgCartesianSeriesOptions[] = [
  {
    type: "scatter",
    xKey: "weekday",
    yKey: "average",
    marker: {
      size: 12
    }
  },

]

const DAY_SCATTER_AXES: AgCartesianAxisOptions[] = [
  { type: "category", position: "bottom", title: { text: "Giorno" } },
  { type: "number", position: "left", title: { text: "Media" }, min: 0, max: 10 },
]

export function Week() {
  const [diary] = useAtom(diaryAtom)
  const [maWindow, setMaWindow] = useState(10)
  if (!diary) return null

  const handleWindowChange = (e: React.ChangeEvent<HTMLInputElement>) => setMaWindow(parseInt(e.target.value))

  const dayData = getDataByDay(diary!)
  const movingAverageData = getMovingAverageData(dayData, maWindow)
  const movingAverageOptions: AgChartOptions = { data: movingAverageData, series: MOVING_AVERAGE_SERIES, axes: MOVING_AVERAGE_AXES }

  const weekdayData = getWeekdayData(dayData)
  const dayScatterOptions: AgChartOptions = { data: weekdayData, series: DAY_SCATTER_SERIES, axes: DAY_SCATTER_AXES }

  return (
    <>
      <div className="flex flex-col w-full h-full">

        <div className="text-xl font-bold text-center mb-2">
          <span>Andamento appetito (media mobile a</span>
          <input type="number" min="1" max={dayData.length} className="mx-2 w-10" onChange={handleWindowChange} value={maWindow}/>
          <span>giorni)</span>
        </div>
        <div className="flex flex-col justify-between mb-6 h-72">
          <AgChartsReact options={movingAverageOptions} />
        </div>

        <div className="text-xl font-bold text-center mb-2">Media appetito per giorno della settimana</div>
        <div className="flex flex-col justify-between mb-6 h-72">
          <AgChartsReact options={dayScatterOptions} />
        </div>
      </div>
    </>
  )
}
