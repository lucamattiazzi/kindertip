import { groupBy, sum } from "lodash-es"
import { GIORNI } from "./constants"
import { Diary } from "./types"
import { quantityToVote } from "./utils"

interface DayData {
  date: Date
  average: number
}

interface WeekDayData {
  weekday: string
  average: number
}

export function movingAverage(data: number[], window: number = 2): number[] {
  const result = []
  for (let i = 0; i < data.length; i++) {
    let total = 0
    for (let j = 0; j < window; j++) {
      const idx = Math.max(0, i - j)
      const value = data[idx]
      total += value / window
    }
    result.push(total)
  }
  return result
}

export function getDataByDay(diary: Diary): DayData[] {
  const dayData = diary.pages
    .filter(p => p.food.length > 0)
    .map(p => {
      const average = sum(p.food.map(f => quantityToVote(f.quantity))) / p.food.length
      const date = new Date(p.date)
      return { date, average }
    })
  return dayData
}

export function getMovingAverageData(dayData: DayData[], window: number = 2): DayData[] {
  const movingAverageData = []
  for (let i = 0; i < dayData.length; i++) {
    let total = 0
    for (let j = 0; j < window; j++) {
      const idx = Math.max(0, i - j)
      const day = dayData[idx]
      total += day.average / window
    }
    movingAverageData.push({ ...dayData[i], average: total })
  }
  return movingAverageData
}

export function getWeekdayData(dayData: DayData[]): WeekDayData[] {
  const grouped = groupBy(dayData, v => v.date.getDay())
  const weekDayData = Object.values(grouped).map<WeekDayData>((day, idx) => {
    const allValues = day.map(d => d.average)
    const average = sum(allValues) / allValues.length
    return { average, weekday: GIORNI[idx] }
  })
  return weekDayData
}