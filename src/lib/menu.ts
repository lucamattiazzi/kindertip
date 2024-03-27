import menu from "../static/menu/fw23-24.json"
import { formatDate } from "./utils"

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000

interface Week {
  mon: string[]
  tue: string[]
  wed: string[]
  thu: string[]
  fri: string[]
}

interface RawMenu {
  name: string
  startingMonday: string
  weeks: Week[]
}

export interface WeekMenu {
  name: string
  week: Week
  weekIdx: number
  from: string
  to: string
}


function getLastMonday(): Date {
  const date = new Date()
  date.setDate(date.getDate() - (date.getDay() + 6) % 7)
  return date
}

export function getCurrentWeekMenu(delta: number = 0): WeekMenu {
  const { name, startingMonday, weeks } = menu as RawMenu
  const lastMonday = getLastMonday()
  const deltaWeeks = delta + Math.floor((lastMonday.getTime() - new Date(startingMonday).getTime()) / (ONE_WEEK))
  const weekIdx = deltaWeeks % weeks.length
  const fromDate = new Date(lastMonday.getTime() + delta * ONE_WEEK)
  const from = formatDate(fromDate)
  const toDate = new Date(lastMonday.getTime() + (delta + 1) * ONE_WEEK)
  const to = formatDate(toDate)
  const currentWeek = weeks[deltaWeeks % weeks.length]
  return { name, week: currentWeek, from, to, weekIdx }
}