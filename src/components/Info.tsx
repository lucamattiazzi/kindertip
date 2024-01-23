interface InfoProp {
  toggleInfo: () => void
}

export function Info(p: InfoProp) {
  return (
    <div className="absolute w-full h-full top-0 left-0 bg-sky-300/95 py-8 z-50" onClick={p.toggleInfo}>
      <h1 className="text-4xl text-center font-bold mb-4">What is this?</h1>
      <div className="text-sm px-2">
        <div className="absolute top-1 right-1 text-4xl cursor-pointer">✖️</div>
        <p className="pb-2">This website is not affiliated with KinderTap, just made by a parent driven (mad?) by curiosity and struggling with insomnia.</p>
        <p className="pb-2">I don't collect any info, won't save your credentials, you can choose to keep yourself authenticated (for up to 3 months, but it depends on KinderTap) and in that case the website will save ONLY ON YOUR BROWSER an authentication token.</p>
        <p className="pb-4">This is completely free, and always will be. You can contact me via email using the mail symbol on the homepage. Be kind.</p>
        <p className="pb-2 font-bold">WARNING: somewhat technical stuff ahead.</p>
        <p className="pb-2">The website is hosted on Netlify, and the code is open source. The two functions hosted on Netlify do not log or send your data anywhere else.</p>
        <p className="pb-2">You'll see a couple of requests made to <code>/.netlify/functions...</code>: I only use those to go around CORS rules enforced by KinderTap, since there is no other way of getting authenticated.</p>
        <p className="pb-2">Feel free to take a look at the code using the GitHub link on the homepage, or click <a className="text-red-700" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">here</a>. Any issue or PR is welcomed!</p>
      </div>
    </div>
  )
}