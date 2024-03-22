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
  const weekNo = deltaWeeks % weeks.length + 1
  const currentWeek = weeks[deltaWeeks % weeks.length]
  return { name, week: currentWeek, weekNo }
}