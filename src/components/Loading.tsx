import { useEffect, useState } from "react"

const FINAL_TEXT = "CARICAMENTO"
const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function getRandomSymbol() {
  const random = Math.floor(Math.random() * SYMBOLS.length)
  return SYMBOLS[random]
}

function getNextString(currentText: string) {
  const validCurrent = FINAL_TEXT.startsWith(currentText) ? currentText : currentText.slice(0, -1)
  const nextValue = validCurrent === FINAL_TEXT ? '' : validCurrent + getRandomSymbol()
  return nextValue
}

interface LoadingProps {
  loading: number
}

export function Loading(p: LoadingProps) {
  const [text, setText] = useState('')


  useEffect(() => {
    const interval = setInterval(() => {
      const next = getNextString(text)
      setText(next)
    }, 10)
    return () => clearInterval(interval)
  }, [text])

  return (
    <>
      <div className="absolute w-full h-full top-0 left-0 bg-red-300/95 py-8 flex flex-col items-center justify-center text-5xl z-50">
        <span className="mb-4">{text}</span>
        <span>{`${Math.ceil(p.loading)}%`}</span>
      </div>
    </>
  )
}
