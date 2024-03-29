const START_DATE = new Date(2023, 9, 5) // creation date of kindertap for kindergarden
const MAX_DURATION = 5000 // 5 seconds
const BATCH_SIZE = 50

interface DiaryResult extends Record<string, string | number> { }

const error = (code: number, msg: string) => new Response(msg, { status: code })
const TEST_DATA = require("./test.json")

function buildDatesList(from: Date, to: Date): string[] {
  const list: string[] = []
  while (from <= to) {
    const weekDay = from.getDay()
    if ([1, 2, 3, 4, 5].includes(weekDay)) {
      list.push(from.toISOString().split("T")[0])
    }
    from = new Date(from.valueOf())
    from.setDate(from.getDate() + 1)
  }
  return list
}

export default async (evt: Request) => {
  const start = Date.now()
  if (evt.method !== 'POST') return error(405, 'Method Not Allowed')
  const { token, id, location, startDate = START_DATE } = await evt.json()
  if (token === 'test') return new Response(JSON.stringify(TEST_DATA))
  if (!token || !id || !location) return error(400, 'Missing token/id/location')
  const firstDate = new Date(startDate)
  const dates = buildDatesList(firstDate, new Date())
  let i = 0
  const results: DiaryResult[] = []
  while (Date.now() - start < MAX_DURATION) {
    if (i >= dates.length) break
    const batch = dates.slice(i, i + BATCH_SIZE)
    const promises = batch.map(async date => {
      const url = `https://api.kindertap.com/v1/cust/${location}/diary?kid=${id}&date=${date}&device=web-parent`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          cookie: `token=${token}`
        }
      })
      const body = await response.json() as DiaryResult
      return { ...body, date }
    })
    const batchResults = await Promise.all(promises)
    results.push(...batchResults)
    i += BATCH_SIZE
  }
  const nextDate = i < dates.length ? dates[i] : null
  const payload = { results, nextDate }
  return new Response(JSON.stringify(payload))
}
