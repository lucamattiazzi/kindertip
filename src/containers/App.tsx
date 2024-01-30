import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Home } from '../components/Home'
import { Info } from '../components/Info'
import { getDiary } from '../lib/apiUtils'
import { retrieveDiary } from '../lib/cache'
import { Diary } from '../lib/types'
import generalInfo from "../static/generalInfo.json"
import mealInfo from "../static/mealInfo.json"
import trendInfo from "../static/trendInfo.json"
import weekInfo from "../static/weekInfo.json"
import { DiaryComponent } from './Diary'
import { Loading } from './Loading'
import { Login } from './Login'
import { Trend } from './Trend'
import { Week } from './Week'

export function App() {
  const [info, setInfo] = useState<boolean>(false)
  const [diary, setDiary] = useState<Diary>()
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<keyof typeof PAGES>("home")

  const goTo = (page: keyof typeof PAGES) => () => setPage(page)
  
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
      info: weekInfo
    }
  }
  
  async function updateCachedDiary() {
    const cachedDiary = retrieveDiary()
    if (!cachedDiary) return
    setLoading(true)
    const diary = await getDiary(cachedDiary.auth, cachedDiary)
    setDiary(diary)
    diary && setPage("home")
    setLoading(false)
  }

  useEffect(() => {
    updateCachedDiary()
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
