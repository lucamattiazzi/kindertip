import { START_DATE } from "./constants"
import { Auth, Diary, DiaryPage, RawDiaryPage } from "./types"
import { extractKid, refinePages } from "./utils"

async function getDiaryPages(token: string, id: string, startDate: string): Promise<RawDiaryPage[]> {
  let currentNextDate = startDate
  const completeResponse = []
  const location = id.split(".")[0]
  // eslint-disable-next-line no-constant-condition
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
    console.log('results', results)
    completeResponse.push(...results)
    if (!nextDate) break
    currentNextDate = nextDate
  }
  console.log('completeResponse', completeResponse)
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

function getLatestDate(pages: DiaryPage[]): string | undefined {
  if (!pages.length) return
  const dates = pages.map(p => p.date)
  const sorted = dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  const latest = sorted[0]
  return latest
}

export async function getDiary(auth: Auth, existingDiary?: Diary): Promise<Diary> {
  const existingPages = existingDiary?.pages || []
  const startingDate = getLatestDate(existingPages) || START_DATE
  const rawPages = await getDiaryPages(auth.token, auth.id, startingDate)
  const kid = existingDiary?.kid || extractKid(rawPages)
  const newPages = refinePages(rawPages)
  const pages = [...existingPages, ...newPages]
  return { pages, auth, kid }
}