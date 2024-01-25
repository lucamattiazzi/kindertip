interface HeaderProps {
  toggleInfo: () => void
  goHome: () => void
}

export function Header(p: HeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl text-center font-bold mb-1">KinderTip</h1>
      <p className="px-6 text-xxs text-center">trasformare il diario di KinderTap in numeri e grafici.</p>
      <div className="absolute top-2 left-2 cursor-pointer text-4xl" onClick={p.goHome}>🏠</div>
      <div className="absolute top-2 right-2 cursor-pointer text-4xl" onClick={p.toggleInfo}>ℹ️</div>
    </div>
  )
}
