import s from './StatusBar.module.css'

export default function StatusBar({ dark = false }) {
  const now = new Date()
  const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`

  return (
    <div className={`${s.bar} ${dark ? s.dark : ''}`}>
      <span className={s.time}>{time}</span>
      <div className={s.logo}>Т-БАНК</div>
      <div className={s.icons}>
        {/* Signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="4" width="3" height="8" rx="1" fill={dark ? 'white' : 'black'} />
          <rect x="4" y="2.5" width="3" height="9.5" rx="1" fill={dark ? 'white' : 'black'} />
          <rect x="8" y="1" width="3" height="11" rx="1" fill={dark ? 'white' : 'black'} />
          <rect x="12" y="0" width="3" height="12" rx="1" fill={dark ? 'white' : 'black'} opacity="0.3" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2C10.5 2 12.7 3.1 14.2 4.8L15.5 3.3C13.6 1.3 11 0 8 0C5 0 2.4 1.3 0.5 3.3L1.8 4.8C3.3 3.1 5.5 2 8 2Z" fill={dark ? 'white' : 'black'} />
          <path d="M8 5.5C9.6 5.5 11 6.2 12 7.3L13.3 5.8C11.9 4.4 10.1 3.5 8 3.5C5.9 3.5 4.1 4.4 2.7 5.8L4 7.3C5 6.2 6.4 5.5 8 5.5Z" fill={dark ? 'white' : 'black'} />
          <circle cx="8" cy="11" r="1.5" fill={dark ? 'white' : 'black'} />
        </svg>
        <span className={s.battery} style={{ color: dark ? '#fff' : '#000' }}>92</span>
      </div>
    </div>
  )
}
