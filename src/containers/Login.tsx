import { FormEvent, useState } from 'react'
import { getAuth, getDiary } from '../lib/apiUtils'
import { Diary } from '../lib/types'

interface LoginProps {
  setDiary: (diary: Diary) => void
  setLoading: (loading: boolean) => void
}

export function Login(p: LoginProps) {
  const [username, _setUsername] = useState('')
  const [password, _setPassword] = useState('')
  const [remember, _setRemember] = useState(false)

  const setUsername = (e: FormEvent<HTMLInputElement>) => _setUsername((e.target as HTMLInputElement).value)
  const setPassword = (e: FormEvent<HTMLInputElement>) => _setPassword((e.target as HTMLInputElement).value)
  const setRemember = (e: FormEvent<HTMLInputElement>) => _setRemember((e.target as HTMLInputElement).checked)

  async function getKidDiary(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    p.setLoading(true)
    const auth = await getAuth(username, password)
    const diary = await getDiary(auth)
    p.setDiary(diary)
    p.setLoading(false)
    if (!remember) return
    localStorage.setItem("token", JSON.stringify(diary.auth))
  }

  return (
    <form onSubmit={getKidDiary}>
      <div className="mb-6 text-center">
        Login using your KinderTap credentials
      </div>
      <div className="flex flex-col items-center justify-around">
        <input className="mb-2 px-2" onInput={setUsername} type="text" placeholder="Username" value={username} />
        <input className="px-2" onInput={setPassword} type="password" placeholder="Password" value={password} />
      </div>

      <div className="flex justify-center text-xs mb-8">
        <input id="remember" type="checkbox" checked={remember} onChange={setRemember}/>
        <label htmlFor="remember">Remember login</label>
      </div>

      <div className="flex justify-center text-sm mb-8">
        <input className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Get kid Diary" />
      </div>
    </form>
  )
}