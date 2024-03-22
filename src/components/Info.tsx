import { useAtom } from "jotai"
import { infoAtom, logout } from "../state"

export function Info() {
  const [, setInfo] = useAtom(infoAtom)
  return (
    <div className="absolute w-full h-full top-0 left-0 bg-white/95 pt-16 px-2 z-50">
      <div className="absolute top-4 right-4 text-4xl cursor-pointer" onClick={() => setInfo(false)}>❌</div>
      <h1 className="text-4xl font-bold mb-6">Info</h1>
      <div className="px-4 text-xl">
        <p className="mb-3">
          Basandosi sui dati di KinderTap questo sito riassume i piatti preferiti del tuo bambino e li ordina in una classifica.
        </p>
        <p className="mb-3">
          Per dubbi e problemi, scrivere <a href="mailto:l.d.mattiazzi@gmail.com" className="font-bold text-blue-700">qui</a> o chiedere al nido.
        </p>
        <p className="mb-3">
          Ringrazio <a href="https://www.samiralapietra.it/" target="_blank" className="font-bold text-blue-700">Samira</a> per il design!
        </p>
        <p className="mb-3">
          Il codice di questo sito si trova <a href="https://github.com/lucamattiazzi/kindertip" target="_blank" className="font-bold text-blue-700">qui</a>.
        </p>
        <p className="mb-3">
          Se vuoi fare logout, clicca <span onClick={logout} className="font-bold text-blue-700">qui</span>.
        </p>
      </div>
    </div>
  )
}
