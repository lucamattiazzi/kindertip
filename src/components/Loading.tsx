import { useEffect, useState } from "react"

const FINAL_TEXT = "LOADING..."
const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ."

function getRandomSymbol() {
  const random = Math.floor(Math.random() * SYMBOLS.length)
  return SYMBOLS[random]
}

function getNextString(currentText: string) {
  const validCurrent = FINAL_TEXT.startsWith(currentText) ? currentText : currentText.slice(0, -1)
  const nextValue = validCurrent === FINAL_TEXT ? '' : validCurrent + getRandomSymbol()
  return nextValue
}

export function Loading() {
  const [text, setText] = useState('')


  useEffect(() => {
    const interval = setInterval(() => {
      const next = getNextString(text)
      setText(next)
    }, 10)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-red-300/95 py-8 flex items-center justify-center text-5xl">
      {text}
    </div>
  )
}