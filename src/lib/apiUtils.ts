import { noop } from "lodash-es"
import { START_DATE } from "./constants"
import { AdvancementFn, Auth, Diary, DiaryPage, RawDiaryPage } from "./types"
import { extractKid, refinePages } from "./utils"

function daysToToday(date: string): number {
  const today = new Date()
  const d = new Date(date)
  const diff = today.getTime() - d.getTime()
  return Math.ceil(diff / (1000 * 3600 * 24))
}

async function getDiaryPages(token: string, id: string, startDate: string, setLoading: AdvancementFn = noop): Promise<RawDiaryPage[]> {
  let currentNextDate = startDate
  const completeResponse = []
  const location = id.split(".")[0]
  const totalExpected = daysToToday(startDate)
  // eslint-disable-next-line no-constant-condition
  setLoading(0)
  while (true) {
    const response = await fetch('/.netlify/functions/diary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, id, location, startDate: currentNextDate }),
    })
    const data = await response.json()
    const { results, nextDate } = data
    completeResponse.push(...results)
    if (!nextDate) break
    currentNextDate = nextDate
    const daysStillMissing = daysToToday(currentNextDate)
    const advancement = (totalExpected - daysStillMissing) / totalExpected * 100
    setLoading(advancement)
  }
  setLoading(100)
  return completeResponse
}

export async function getAuth(username: string, password: string): Promise<Auth> {
  const payload = { username, password }
  const response = await fetch('/.netlify/functions/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  const { token, kids: [{ id }] } = data
  return { token, id }
}

function getNextStartingDate(pages: DiaryPage[]): string | undefined {
  if (!pages.length) return
  const dates = pages.map(p => p.date)
  const sorted = dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  const latest = sorted[0]
  const latestDate = new Date(latest)
  latestDate.setDate(latestDate.getDate())
  return latestDate.toISOString().split("T")[0]
}

export async function getDiary(auth: Auth, existingDiary: Diary | null = null, setLoading: AdvancementFn = noop): Promise<Diary> {
  const existingPages = existingDiary?.pages || []
  const startingDate = getNextStartingDate(existingPages) || START_DATE
  const rawPages = await getDiaryPages(auth.token, auth.id, startingDate, setLoading)
  const kid = existingDiary?.kid || extractKid(rawPages)
  const newPages = refinePages(rawPages)
  const pages = [...existingPages.slice(0, -1), ...newPages]
  return { pages, auth, kid }
}