import { useAtom } from 'jotai'
import { FormEvent, useState } from 'react'
import { getAuth, getDiary } from '../lib/apiUtils'
import { diaryAtom } from '../state'
import { Loading } from './Loading'

export function Login() {
  const [username, _setUsername] = useState('')
  const [password, _setPassword] = useState('')
  const [remember, _setRemember] = useState(true)
  const [loading, setLoading] = useState<number | null>(null)

  const [, setDiary] = useAtom(diaryAtom)

  const setUsername = (e: FormEvent<HTMLInputElement>) => _setUsername((e.target as HTMLInputElement).value)
  const setPassword = (e: FormEvent<HTMLInputElement>) => _setPassword((e.target as HTMLInputElement).value)
  const setRemember = (e: FormEvent<HTMLInputElement>) => _setRemember((e.target as HTMLInputElement).checked)

  async function getKidDiary(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    setLoading(0)
    const auth = await getAuth(username, password)
    const diary = await getDiary(auth, undefined, setLoading)
    setDiary(diary)
    setLoading(null)
  }

  return (
    <>
      <form onSubmit={getKidDiary}>
        <div className="mb-6 text-center">
          Fai login con le credenziali di KinderTap
        </div>
        <div className="flex flex-col items-center justify-around mb-4">
          <input className="mb-2 px-2" onInput={setUsername} type="text" placeholder="Username" value={username} />
          <input className="px-2" onInput={setPassword} type="password" placeholder="Password" value={password} />
        </div>

        <div className="flex justify-center text-xs mb-8">
          <input id="remember" type="checkbox" checked={remember} onChange={setRemember} className="mr-2"/>
          <label htmlFor="remember">Ricordati di me</label>
        </div>

        <div className="flex justify-center text-sm mb-8">
          <input className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Accedi" />
        </div>
      </form>
      { loading !== null && <Loading loading={loading!} /> }
    </>
  )
}
