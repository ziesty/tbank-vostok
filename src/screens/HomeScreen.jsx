import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import SpendBar from '../components/SpendBar'
import { formatAmount } from '../utils/format'
import s from './HomeScreen.module.css'

function QuickAction({ icon, label, onClick }) {
  return (
    <div className={s.quickItem} onClick={onClick}>
      <div className={s.quickIcon}>{icon}</div>
      <div className={s.quickLabel}>{label}</div>
    </div>
  )
}

function AccountCard({ symbol, name, amount, currency = '₽', badge, showCard, onClick }) {
  return (
    <div className={s.accountCard} onClick={onClick}>
      <div className={s.accountLeft}>
        <div className={s.accountAvatar}>
          <span>{symbol}</span>
        </div>
        <div className={s.accountInfo}>
          <div className={s.accountAmount}>{formatAmount(amount)} {currency}</div>
          <div className={s.accountName}>{name}</div>
        </div>
      </div>
      {badge && (
        <div className={s.accountBadge}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M2 19h20M3 19l2-9 5 4 2-7 2 7 5-4 2 9H3z" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
          </svg>
          <span>{badge}</span>
        </div>
      )}
    </div>
  )
}

export default function HomeScreen({ settings, onOperations, onAccount, onTransfer, onSettings }) {
  const firstName = (settings.senderName || 'Пользователь').split(' ')[0]

  return (
    <div className={s.screen}>
      <StatusBar />
      <div className={s.content}>
        {/* User row */}
        <div className={s.userRow}>
          <div className={s.userLeft}>
            <div className={s.userAvatar}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#8e8e93" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="#8e8e93" strokeWidth="1.8" fill="none"/>
              </svg>
            </div>
            <div className={s.userName}>
              <span>{firstName}</span>
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M2 4l3 3 3-3" stroke="#1c1c1e" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <button className={s.settingsBtn} onClick={onSettings}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.8"/>
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className={s.search}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#8e8e93" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Поиск</span>
        </div>

        {/* Widget grid */}
        <div className={s.widgetGrid}>
          <div className={s.widget} onClick={onOperations}>
            <div className={s.widgetTitle}>Все операции</div>
            <div className={s.widgetSub}>Трат в апреле</div>
            <div className={s.widgetAmount}>{formatAmount(settings.totalSpent)} ₽</div>
            <SpendBar />
          </div>
          <div className={s.widget}>
            <div className={s.widgetRow}>
              <div className={s.widgetTitle}>Кэшбэк{'\n'}и бонусы</div>
              <div className={s.widgetBadge}>1</div>
            </div>
            <div className={s.cashbackIcons}>
              {['🎯', '🔨', '🍷'].map((e, i) => (
                <div key={i} className={s.cashbackCircle} style={{ background: ['#ffcc00','#3a3a3c','#7c3aed'][i] }}>
                  {e}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className={s.quickCard}>
          <div className={s.quickRow}>
            <QuickAction
              onClick={onTransfer}
              label={['Перевести', 'по телефону']}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#4891f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />
            <QuickAction label={['Пополнить', 'Black']}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><line x1="12" y1="5" x2="12" y2="19" stroke="#4891f5" strokeWidth="2.2" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke="#4891f5" strokeWidth="2.2" strokeLinecap="round"/></svg>}
            />
            <QuickAction label={['Сканировать', 'QR-код']}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" stroke="#4891f5" strokeWidth="1.8" fill="none" strokeLinejoin="round"/><path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 17v4" stroke="#4891f5" strokeWidth="1.8" fill="none"/></svg>}
            />
            <QuickAction label={['Оплатить', 'айфоном']}
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M2 12c1.5-3 3-4.5 4.5-4.5S9 9 10.5 9s3-3 4.5-3S18 8.5 19.5 8.5 22 7 22 7" stroke="#4891f5" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>}
            />
          </div>
        </div>

        {/* Account cards */}
        <AccountCard
          symbol="₽" name="Black"
          amount={settings.blackBalance}
          badge="9 Р"
          showCard
          onClick={onAccount}
        />
        <AccountCard symbol="$" name="Black USD" amount={0.01} currency="$" />
        <AccountCard symbol="€" name="Black EUR" amount={0} currency="€" />

        <div style={{ height: 20 }} />
      </div>
      <BottomNav />
    </div>
  )
}
