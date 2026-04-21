import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import SpendBar from '../components/SpendBar'
import { formatAmount, groupByDate } from '../utils/format'
import s from './TransferList.module.css'

function dateLabel(isoString) {
  const d = new Date(isoString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const same = (a, b) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()

  if (same(d, today)) return 'Сегодня'
  if (same(d, yesterday)) return 'Вчера'

  const months = ['января','февраля','марта','апреля','мая','июня',
                  'июля','августа','сентября','октября','ноября','декабря']
  return `${d.getDate()} ${months[d.getMonth()]}`
}

function OpItem({ op, onClick }) {
  const isPositive = op.amount > 0
  const isTransfer = op.type === 'transfer'

  return (
    <div className={s.opItem} onClick={onClick}>
      <div className={s.opAvatar} style={{ background: isTransfer ? 'transparent' : op.avatarColor }}>
        {isTransfer
          ? <img src="tbank-logo.png" style={{ width: 44, height: 44, borderRadius: 22, objectFit: 'cover' }} />
          : <span className={s.opLetter}>{op.avatar}</span>
        }
      </div>
      <div className={s.opInfo}>
        <div className={s.opRow}>
          <span className={s.opName}>{op.recipient}</span>
          <span className={s.opAmount} style={{ color: isPositive ? '#34c759' : '#1c1c1e' }}>
            {isPositive ? '+' : ''}{op.amount > 0 ? '' : ''}{formatAmount(Math.abs(op.amount))} ₽
          </span>
        </div>
        <div className={s.opRow}>
          <span className={s.opCategory}>{isTransfer ? 'Переводы' : 'Супермаркеты'}</span>
          <span className={s.opSub}>Дебетовая карта</span>
        </div>
      </div>
    </div>
  )
}

export default function TransferList({ operations, settings, onSelect, onNewTransfer, onSettings }) {
  const groups = groupByDate(operations)

  return (
    <div className={s.screen}>
      <StatusBar />
      <div className={s.header}>
        <span className={s.closeBtn} onClick={onSettings}>Закрыть</span>
        <span className={s.headerTitle}>Операции</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <line x1="18" y1="20" x2="18" y2="10" stroke="#4891f5" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="20" x2="12" y2="4" stroke="#4891f5" strokeWidth="2" strokeLinecap="round"/>
          <line x1="6" y1="20" x2="6" y2="14" stroke="#4891f5" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <div className={s.content}>
        {/* Search */}
        <div className={s.search}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#8e8e93" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Поиск</span>
        </div>

        {/* Filters */}
        <div className={s.filters}>
          <div className={s.filterYellow}>Апрель ▾</div>
          <div className={s.filterYellow}>Black ✕</div>
          <div className={s.filterGray}>Без переводов</div>
        </div>

        {/* Summary */}
        <div className={s.summaryGrid}>
          <div className={s.summaryCard}>
            <div className={s.summaryAmount}>{formatAmount(settings.totalSpent)} ₽</div>
            <div className={s.summarySub}>Траты</div>
            <SpendBar />
          </div>
          <div className={s.summaryCard}>
            <div className={s.summaryAmount}>{formatAmount(settings.totalIncome)} ₽</div>
            <div className={s.summarySub}>Доходы</div>
            <SpendBar green />
          </div>
        </div>

        {/* Promo */}
        <div className={s.promo}>
          <div className={s.promoIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21.21 15.89A10 10 0 118 2.83" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 12A10 10 0 0012 2v10z" fill="#fff"/>
            </svg>
          </div>
          <div>
            <div className={s.promoTitle}>Доступна рассрочка</div>
            <div className={s.promoSub}>Для 2 операций на сумму 2 211,96</div>
          </div>
        </div>

        {/* Operations grouped */}
        {groups.map((group) => {
          const groupTotal = group.items.reduce((acc, o) => acc + o.amount, 0)
          return (
            <div key={group.dateKey}>
              <div className={s.dateHeader}>
                <span className={s.dateLabel}>{dateLabel(group.date)}</span>
                <span className={s.dateTotal}>
                  {groupTotal > 0 ? '+' : '−'}{formatAmount(Math.abs(groupTotal))} ₽
                </span>
              </div>
              {group.items.map(op => (
                <OpItem key={op.id} op={op} onClick={() => onSelect(op)} />
              ))}
            </div>
          )
        })}

        <div style={{ height: 80 }} />
      </div>

      {/* FAB */}
      <button className={s.fab} onClick={onNewTransfer}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="#1c1c1e" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>

      <BottomNav />
    </div>
  )
}
