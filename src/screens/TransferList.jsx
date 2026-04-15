import { formatAmount, groupByDate, formatDateShort } from '../utils/format'
import s from './TransferList.module.css'

function Avatar({ letter, color }) {
  const isTbank = letter === 'T'
  return (
    <div className={s.avatar} style={{ background: isTbank ? '#FFDD2D' : color }}>
      {isTbank ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 6v5c0 5.25 3.4 10.15 8 11.35C16.6 21.15 20 16.25 20 11V6L12 2z" fill="#1c1c1e"/>
          <text x="12" y="17" textAnchor="middle" fill="#FFDD2D" fontSize="10" fontWeight="bold">T</text>
        </svg>
      ) : (
        <span className={s.avatarLetter}>{letter}</span>
      )}
    </div>
  )
}

function OpItem({ op, onClick }) {
  const isPositive = op.amount > 0
  const isTransfer = op.type === 'transfer'
  const categoryLabel = isTransfer ? 'Переводы' : 'Супермаркеты'

  return (
    <button className={s.opItem} onClick={onClick}>
      <Avatar letter={op.avatar} color={op.avatarColor} />
      <div className={s.opInfo}>
        <span className={s.opName}>{op.recipient}</span>
        <span className={s.opCategory}>{categoryLabel}</span>
      </div>
      <div className={s.opRight}>
        <span className={s.opAmount} style={{ color: isPositive ? '#30d158' : '#ffffff' }}>
          {isPositive ? '+' : '−'}{formatAmount(Math.abs(op.amount))} ₽
        </span>
        <span className={s.opAccount}>Black</span>
      </div>
    </button>
  )
}

export default function TransferList({ operations, onSelect, onNewTransfer }) {
  const groups = groupByDate(operations)

  const totalSpent = operations
    .filter(o => o.amount < 0)
    .reduce((acc, o) => acc + Math.abs(o.amount), 0)
  const totalIncome = operations
    .filter(o => o.amount > 0)
    .reduce((acc, o) => acc + o.amount, 0)

  return (
    <div className={s.container}>
      {/* Header */}
      <div className={s.header}>
        <button className={s.backBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#4da6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className={s.headerTitle}>Операции</span>
        <div className={s.headerRight}>
          <button className={s.iconBtn}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#4da6ff" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="#4da6ff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className={s.iconBtn}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="4" height="18" rx="1" fill="#4da6ff"/>
              <rect x="10" y="8" width="4" height="13" rx="1" fill="#4da6ff"/>
              <rect x="17" y="5" width="4" height="16" rx="1" fill="#4da6ff"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={s.filters}>
        <button className={`${s.filterBtn} ${s.filterActive}`}>Апрель ▾</button>
        <button className={s.filterBtn}>Счета и карты ▾</button>
        <button className={s.filterBtn}>Без переводов</button>
      </div>

      {/* Stats */}
      <div className={s.stats}>
        <div className={s.statCard}>
          <span className={s.statAmount}>{formatAmount(totalSpent)} ₽</span>
          <span className={s.statLabel}>Траты</span>
        </div>
        <div className={s.statCard}>
          <span className={s.statAmount}>{formatAmount(totalIncome)} ₽</span>
          <span className={s.statLabel}>Доходы</span>
        </div>
      </div>

      {/* Operations */}
      <div className={s.opList}>
        {groups.map((group, gi) => {
          const groupTotal = group.items.reduce((acc, o) => acc + o.amount, 0)
          return (
            <div key={group.dateKey}>
              {gi > 0 && (
                <div className={s.dateHeader}>
                  <span className={s.dateLabel}>{formatDateShort(group.date)}</span>
                  <span className={s.dateTotal} style={{ color: groupTotal > 0 ? '#30d158' : '#8e8e93' }}>
                    {groupTotal > 0 ? '+' : ''}{formatAmount(groupTotal)} ₽
                  </span>
                </div>
              )}
              {group.items.map(op => (
                <OpItem key={op.id} op={op} onClick={() => onSelect(op)} />
              ))}
            </div>
          )
        })}
      </div>

      {/* FAB */}
      <button className={s.fab} onClick={onNewTransfer}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="#1c1c1e" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}
