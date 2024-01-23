import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Info } from '../components/Info'
import { Loading } from '../components/Loading'
import { getDiary } from '../lib/apiUtils'
import { Auth, Diary } from '../lib/types'
import { DiaryComponent } from './Diary'
import { Login } from './Login'

interface AppProps {
  auth?: Auth
}

export function App(p: AppProps) {
  const [diary, setDiary] = useState<Diary>()
  const [info, setInfo] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  async function fetchDiary() {
    if (!p.auth) return
    setLoading(true)
    const diary = await getDiary(p.auth)
    setDiary(diary)
    setLoading(false)
    return
  }

  useEffect(() => {
    fetchDiary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleInfo = () => setInfo(!info)

  return (
    <>
      <Header toggleInfo={toggleInfo} />
      { loading && <Loading /> }
      { info && <Info toggleInfo={toggleInfo} /> }
      { diary && <DiaryComponent diary={diary} /> }
      { !diary && <Login setLoading={setLoading} setDiary={setDiary} /> }
    </>
  )
}
