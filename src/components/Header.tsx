interface HeaderProps {
  toggleInfo: () => void
}

export function Header(p: HeaderProps) {
  return (
    <div>
      <h1 className="text-5xl text-center font-bold mb-1">KinderTip</h1>
      <p className="px-6 text-xxs text-center">or: use your kid's KinderTap diary to see cool numbers and plots.</p>
      <div className="flex justify-around items-center mb-4">
        <a href="https://github.com/lucamattiazzi/kindertip" target="_blank">
          <img width="40" height="40" src="/github.png" />
        </a>
        <div className="emoji-button" onClick={p.toggleInfo}>ℹ️</div>
        <a className="emoji-button" href="mailto:l.d.mattiazzi@gmail.com?subject=Something about KinderTip" target="_blank">📧</a>
      </div>
    </div>
  )
}