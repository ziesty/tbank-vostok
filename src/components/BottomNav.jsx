import s from './BottomNav.module.css'

const ITEMS = [
  { id: 'home',  label: 'Главная', badge: 1 },
  { id: 'pay',   label: 'Платежи' },
  { id: 'city',  label: 'Город' },
  { id: 'chat',  label: 'Чат', badge: 20 },
  { id: 'shop',  label: 'Витрина' },
]

const Icons = {
  home: (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={c} strokeWidth="1.8" fill="none" strokeLinejoin="round"/><path d="M9 22V12h6v10" stroke={c} strokeWidth="1.8" fill="none"/></svg>,
  pay:  (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke={c} strokeWidth="1.8" fill="none"/><line x1="2" y1="10" x2="22" y2="10" stroke={c} strokeWidth="1.8"/></svg>,
  city: (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke={c} strokeWidth="1.8" fill="none"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke={c} strokeWidth="1.8" fill="none"/></svg>,
  chat: (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={c} strokeWidth="1.8" fill="none" strokeLinejoin="round"/></svg>,
  shop: (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="21" r="1" fill={c}/><circle cx="20" cy="21" r="1" fill={c}/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67L23 6H6" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>,
}

export default function BottomNav({ dark = false }) {
  return (
    <nav className={`${s.nav} ${dark ? s.dark : ''}`}>
      {ITEMS.map((it, i) => {
        const active = i === 0
        const color = active ? '#FFDD2D' : '#8e8e93'
        return (
          <div key={it.id} className={`${s.item} ${active ? s.active : ''}`}>
            {it.badge && <span className={s.badge}>{it.badge}</span>}
            {Icons[it.id](color)}
            <span style={{ color }}>{it.label}</span>
          </div>
        )
      })}
    </nav>
  )
}
