
export function About() {

  return (
    <div className="w-full h-full">
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
      </div>
    </div>
  )
}