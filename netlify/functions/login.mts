const TEST_DATA = {
  token: "test",
  kids: [{ id: "bingo" }]
}

function extractToken(headers: Headers, key: string): string | null {
  const cookieString = headers.get('set-cookie')
  if (!cookieString) return null
  const cookies = cookieString.split(";").reduce((acc: Record<string, string>, cookie: string) => {
    const [key, value] = cookie.split("=") as [string, string]
    acc[key.trim()] = value
    return acc
  }, {})
  return cookies[key]
}

function error(code: number, msg: string) {
  return new Response(msg, { status: code })
}

export default async (evt: Request) => {
  if (evt.method !== 'POST') return error(405, 'Method Not Allowed')
  const { username, password } = await evt.json()
  if (!username || !password) return error(400, 'Missing username or password')
  if (username === 'test' && password === 'test') return new Response(JSON.stringify(TEST_DATA))
  const body = { username, password, authSource: "mobileApp", source: "mobileApp-android" }
  const response = await fetch('https://api.kindertap.com/v1/auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  if (data.error) return error(401, data.error)
  const token = extractToken(response.headers, 'token')
  if (!token) return error(401, 'Token not found')
  const payload = { ...data, token }
  return new Response(JSON.stringify(payload))
}
