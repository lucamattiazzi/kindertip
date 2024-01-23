import { IS_DEV } from "./constants"
import { Auth, Diary, RawDiaryPage } from "./types"
import { extractKid, refinePages } from "./utils"

async function getDiaryPages(token: string, id: string): Promise<RawDiaryPage[]> {
  if (IS_DEV) return fetch("/diary.json").then(r => r.json())
  const location = id.split(".")[0]
  const response = await fetch('/.netlify/functions/diary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token, id, location }),
  })
  const data = await response.json()
  return data
}

export async function getAuth(username: string, password: string): Promise<Auth> {
  if (IS_DEV) return { token: "", id: "" }
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

export async function getDiary(auth: Auth): Promise<Diary> {
  const rawPages = await getDiaryPages(auth.token, auth.id)
  const kid = extractKid(rawPages)
  const pages = refinePages(rawPages)
  return { pages, auth, kid }
}