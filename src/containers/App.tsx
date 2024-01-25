import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Home } from '../components/Home'
import { Info } from '../components/Info'
import { getDiary } from '../lib/apiUtils'
import { Auth, Diary } from '../lib/types'
import generalInfo from "../static/generalInfo.json"
import mealInfo from "../static/mealInfo.json"
import trendInfo from "../static/trendInfo.json"
import { DiaryComponent } from './Diary'
import { Loading } from './Loading'
import { Login } from './Login'
import { Trend } from './Trend'
import { Week } from './Week'

interface AppProps {
  auth?: Auth
}

export function App(p: AppProps) {
  const [info, setInfo] = useState<boolean>(false)
  const [diary, setDiary] = useState<Diary>()
  const [loading, setLoading] = useState<boolean>(false)  
  const [page, setPage] = useState<keyof typeof PAGES>("home")

  const goTo = (page: "diary" | "trend" | "home" | "week") => () => setPage(page)
  
  const PAGES = {
    home: {
      component: <Home
        goToDiary={goTo("diary")}
        goToTrend={goTo("trend")}
        goToWeek={goTo("week")}
        diary={diary}
      />,
      info: generalInfo
    },
    diary: {
      component: <DiaryComponent diary={diary} />,
      info: mealInfo,
    },
    trend: {
      component: <Trend diary={diary} />,
      info: trendInfo
    },
    week: {
      component: <Week diary={diary} />,
      info: trendInfo
    }
  }
  
  async function fetchDiary() {
    if (!p.auth) return
    setLoading(true)
    const diary = await getDiary(p.auth)
    setDiary(diary)
    setLoading(false)
    if (diary) setPage("diary")
  }

  useEffect(() => {
    fetchDiary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleInfo = () => setInfo(!info)

  return (
    <>
      <Header toggleInfo={toggleInfo} goHome={goTo("home")}/>
      { loading && <Loading /> }
      { info && <Info toggleInfo={toggleInfo} info={PAGES[page].info}/> }
      { !diary && <Login setLoading={setLoading} setDiary={setDiary} /> }
      { diary && PAGES[page].component}
    </>
  )
}
