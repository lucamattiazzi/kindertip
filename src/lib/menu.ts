import menu from "../static/menu/fw23-24.json"

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

interface WeekMenu {
  name: string
  week: Week
  weekNo: number
}

function getLastMonday(): Date {
  const date = new Date()
  date.setDate(date.getDate() - (date.getDay() + 6) % 7)
  return date
}

export function getCurrentWeekMenu(): WeekMenu {
  const { name, startingMonday, weeks } = menu as RawMenu
  const lastMonday = getLastMonday()
  const deltaWeeks = Math.floor((lastMonday.getTime() - new Date(startingMonday).getTime()) / (7 * 24 * 60 * 60 * 1000))
  const deltaWeeksRemainder = deltaWeeks % weeks.length + 1
  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6
  const weekNo = isWeekend ? deltaWeeksRemainder + 1 : deltaWeeksRemainder
  const currentWeek = weeks[deltaWeeks % weeks.length]
  return { name, week: currentWeek, weekNo }
}