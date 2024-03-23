import { useAtom } from "jotai";
import { NavLink } from "react-router-dom";
import { infoAtom } from "../state";


export function Header() {
  const [, setInfo] = useAtom(infoAtom)
  return (
    <>
      <div className="my-10 w-full flex justify-between items-center">
        <NavLink to="/">
          <h1 className="text-3xl text-left font-bold mb-1 text-blue-800">KinderTip</h1>
        </NavLink>
        <div className="text-4xl" onClick={() => setInfo(true)}>🍔</div>
      </div>
    </>
  )
}
