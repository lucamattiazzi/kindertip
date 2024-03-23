import { useAtom } from "jotai"
import { useNavigate } from "react-router-dom"
import { infoAtom, isLoggedAtom, logout } from "../state"

export function Info() {
  const [, setInfo] = useAtom(infoAtom)
  const navigate = useNavigate()
  const [isLogged] = useAtom(isLoggedAtom)


  function closeInfoAndNavigate(path: string) {
    setInfo(false)
    navigate(path)
  }

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-white/95 pt-16 px-4 z-50 flex items-center justify-center">
      <div className="absolute top-4 right-4 text-4xl cursor-pointer" onClick={() => setInfo(false)}>❌</div>
      <div className="w-full flex flex-col py-16 bg-fuchsia-700/60 rounded-4xl items-start px-16">
        <h1 className="text-4xl font-bold mb-6 text-center w-full">Pagine</h1>
        <div onClick={() => closeInfoAndNavigate("/")} className="text-3xl mb-5">🏠 - Home</div>
        { isLogged && <div onClick={() => closeInfoAndNavigate("/diary")} className="text-3xl mb-5">🏆 - Classifica</div> }
        { isLogged && <div onClick={() => closeInfoAndNavigate("/week")} className="text-3xl mb-5">📊 - Trend</div> }
        <div onClick={() => closeInfoAndNavigate("/about")} className="text-3xl">❓ - About</div>
        { isLogged &&
          <>
            <hr className="w-full my-8" />
            <div onClick={() => logout()} className="text-3xl">🚪 - Logout</div>
          </>
        }
      </div>
    </div>
  )
}
