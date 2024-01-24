interface InfoProp {
  toggleInfo: () => void
}

export function Info(p: InfoProp) {
  return (
    <div className="absolute w-full h-full top-0 left-0 bg-sky-300/95 py-8 z-50" onClick={p.toggleInfo}>
      <h1 className="text-4xl text-center font-bold mb-4">Cos'è questo sito?</h1>
      <div className="text-sm px-2">
        <div className="absolute top-1 right-1 text-4xl cursor-pointer">✖️</div>
        <p className="pb-1">1 - né io né questo sito siamo collegati direttamente a KinderTip, ne usiamo solo i dati.</p>
        <p className="pb-1">2 - non ricevo né mi salvo nessun vostro dato, potete scegliere di salvare l'accesso (per circa 3 mesi), e in tal caso SOLO SUL VOSTRO BROWSER verrà salvata l'autenticazione.</p>
        <p className="pb-2">3 - questo sito è e resterà ovviamente gratuito e open source, in homepage trovate codice e un'email dove contattarmi se volete.</p>
        <p className="pb-1 font-bold">ATTENZIONE: roba un po' tecnica ora.</p>
        <p className="pb-1">Il sito è hostato da Netlify, e usa due Netlify functions (tipo lambda di aws diciamo) per aggirare le regole CORS implementate dal servet di KinderTap. Le funzioni non si salvano nulla, né loggano, ma potete controllare dal codice appunto.</p>
        <p className="pb-1">Sempre sul repository, linkato in homepage o <a className="text-red-700" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">qui</a> potete aprire issues, ed eventuali PR sono benvenute!</p>
      </div>
    </div>
  )
}
