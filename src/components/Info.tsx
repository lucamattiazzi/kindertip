interface InfoText {
  title: string
  content: {
    text: string
    classes: string
  }[]
}

interface InfoProp {
  toggleInfo: () => void
  info: InfoText
}

export function Info(p: InfoProp) {
  const { content, title } = p.info
  return (
    <div className="absolute w-full h-full top-0 left-0 bg-sky-300/95 py-8 z-50" onClick={p.toggleInfo}>
      <h1 className="text-4xl text-center font-bold mb-4">{title}</h1>
      <div className="px-2">
        <div className="absolute top-1 right-1 text-4xl cursor-pointer">✖️</div>
        { content.map((t, i) => <p key={i} className={`pb-1 ${t.classes}`}>{t.text}</p>) }
      </div>
    </div>
  )
}
