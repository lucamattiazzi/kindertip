import { useAtom } from "jotai"
import { capitalize } from "lodash-es"
import { Header } from "../components/Header"
import { clearDiary } from "../lib/cache"
import { diaryAtom } from "../state"

export function Home() {
  const [diary] = useAtom(diaryAtom)
  const name = capitalize(diary?.kid.name || "...")

  function logout() {
    clearDiary()
    window.location.reload()
  }

  return (
    <>
      <Header component="home" />
      <div className="text-center text-3xl mb-9">Diario di {name}</div>
      <div className="flex flex-col items-start w-full px-8 text-xl">
        <div className="flex items-center justify-center cursor-pointer mb-5">
          <a href="/diary">📋 - Guarda la <b>classifica piatti</b></a>
        </div>
        <div className="flex items-center justify-center cursor-pointer mb-5">
          <a href="/trend">📈 - Guarda l'<b>andamento mensile e annuale</b></a>
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          <a href="/week">📅 - Guarda la <b>settimana pasti</b></a>
        </div>
        <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 my-16"/>
        <div className="flex items-center justify-center mb-5">
          <a href="mailto:l.d.mattiazzi@gmail.com?subject=KinderTip" target="_blank">📧 - Contattami</a>
        </div>
        <a href="https://github.com/lucamattiazzi/kindertip" target="_blank" className="flex items-center justify-center mb-5">
          <img width="18" height="18" src="/github.png" /><span>&nbsp;- Guarda il codice</span>
        </a>
        <div className="flex items-center justify-center cursor-pointer">
          <div onClick={logout}>🚫 - Logout</div>
        </div>
      </div>
    </>
  )
}