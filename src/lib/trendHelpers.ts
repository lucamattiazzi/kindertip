import { AgChartOptions } from "ag-charts-community"
import { identity } from "lodash-es"
import { MESI } from "./constants"
import { monthGrouper, weekGrouper, yearGrouper } from "./utils"

export const BASE_OPTIONS: AgChartOptions = {
  series: [{ type: 'line', xKey: 'date', yKey: 'average' }],
  axes: [
    {
      type: "category",
      position: "bottom",
      label: {
        formatter: params => {
          const date = new Date(params.value)
          return `${date.getDate()}/${date.getMonth() + 1}`
        }
      }
    },
    {
      type: "number",
      position: "left",
    },
  ]
}

export const SELECT_OPTIONS = [
  { value: "week", label: "Settimana" },
  { value: "month", label: "Mese" },
  { value: "year", label: "Anno" },
] as const

export const GROUPERS = {
  week: weekGrouper,
  month: monthGrouper,
  year: yearGrouper,
}

export const TITLE_BUILDERS = {
  week: identity,
  year: identity,
  month: (d: string) => {
    const [year, month] = d.split("-")
    const monthName = MESI[Number(month) - 1]
    return `${monthName} ${year}`
  }
} as const