const START_DATE = new Date(2023, 9, 5) // creation date of kindertap for kindergarden

function error(code: number, msg: string) {
  return new Response(msg, { status: code })
}

function getDates(from: Date, to: Date): string[] {
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
  if (evt.method !== 'POST') return error(405, 'Method Not Allowed')
  const { token, id, location } = await evt.json()
  if (!token || !id || !location) return error(400, 'Missing token/id/location')
  const dates = getDates(START_DATE, new Date())
  const foodsPromise = dates.map(async date => {
    const url = `https://api.kindertap.com/v1/cust/${location}/diary?kid=${id}&date=${date}&device=web-parent`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        cookie: `token=${token}`
      }
    })
    const body = await response.json()
    return body
  })
  const payload = await Promise.all(foodsPromise)
  return new Response(JSON.stringify(payload))
}
