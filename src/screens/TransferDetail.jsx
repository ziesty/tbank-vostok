import { useState } from 'react'
import { formatAmount, formatDate } from '../utils/format'
import s from './TransferDetail.module.css'

function TBankIcon({ size = 64 }) {
  return (
    <div className={s.tbankCircle} style={{ width: size, height: size }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 6v5c0 5.25 3.4 10.15 8 11.35C16.6 21.15 20 16.25 20 11V6L12 2z" fill="#1c1c1e"/>
        <text x="12" y="17" textAnchor="middle" fill="#FFDD2D" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">T</text>
      </svg>
    </div>
  )
}

function Avatar({ letter, color, size = 64 }) {
  const isTbank = letter === 'T'
  return isTbank
    ? <TBankIcon size={size} />
    : (
      <div className={s.avatar} style={{ width: size, height: size, background: color }}>
        <span className={s.avatarLetter}>{letter}</span>
      </div>
    )
}

function ConfirmSheet({ recipient, onConfirm, onCancel }) {
  return (
    <>
      <div className={s.overlay} onClick={onCancel} />
      <div className={s.sheet}>
        <div className={s.sheetHandle} />
        <div className={s.sheetIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <polyline points="3 6 5 6 21 6" stroke="#ff453a" strokeWidth="2" strokeLinecap="round"/>
            <path d="M19 6l-1 14H6L5 6" stroke="#ff453a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 11v6M14 11v6" stroke="#ff453a" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 6V4h6v2" stroke="#ff453a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className={s.sheetTitle}>Удалить операцию?</p>
        <p className={s.sheetSub}>
          Перевод <span className={s.sheetName}>{recipient}</span> будет удалён из истории. Это действие нельзя отменить.
        </p>
        <div className={s.sheetBtns}>
          <button className={s.sheetCancel} onClick={onCancel}>Отмена</button>
          <button className={s.sheetConfirm} onClick={onConfirm}>Удалить</button>
        </div>
      </div>
    </>
  )
}

export default function TransferDetail({ operation: op, settings, onBack, onReceipt, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false)

  const { day, month, hours, mins } = formatDate(op.date)
  const isPositive = op.amount > 0
  const isTransfer = op.type === 'transfer'

  const blackBalance = settings?.blackBalance ?? 6916.54
  const senderName = op.sender || settings?.senderName || 'Отправитель'
  const showDetails = settings?.showOperationDetails ?? true

  return (
    <div className={s.container}>
      {/* Header */}
      <div className={s.header}>
        <button className={s.backBtn} onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#4da6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className={s.headerDate}>{day} {month}, {hours}:{mins}</span>
        <button className={s.deleteIconBtn} onClick={() => setShowConfirm(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <polyline points="3 6 5 6 21 6" stroke="#ff453a" strokeWidth="2" strokeLinecap="round"/>
            <path d="M19 6l-1 14H6L5 6" stroke="#ff453a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 11v6M14 11v6" stroke="#ff453a" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 6V4h6v2" stroke="#ff453a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className={s.scroll}>
        {/* Avatar + name + amount */}
        <div className={s.hero}>
          <Avatar letter={op.avatar} color={op.avatarColor} size={72} />
          <span className={s.heroName}>{op.recipient}</span>
          <div className={s.heroBadges}>
            <span className={s.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}>
                <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16" stroke="#4da6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {isTransfer ? 'Переводы' : 'Покупки'}
            </span>
            <button className={s.editBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <span className={s.heroAmount} style={{ color: isPositive ? '#30d158' : '#fff' }}>
            {isPositive ? '+' : '−'}{formatAmount(Math.abs(op.amount))} ₽
          </span>
        </div>

        {/* Action buttons */}
        <div className={s.actions}>
          {[
            { icon: '★', label: 'Избранное' },
            { icon: '↩', label: 'Повторить' },
            { icon: '⊘', label: 'Не учитывать' },
            { icon: '⋯', label: 'Оспорить' },
          ].map(({ icon, label }) => (
            <div key={label} className={s.actionItem}>
              <div className={s.actionIcon}>{icon}</div>
              <span className={s.actionLabel}>{label}</span>
            </div>
          ))}
        </div>

        {/* Transfer from account */}
        <div className={s.card}>
          <div className={s.cardHeader}>
            <span className={s.cardTitle}>Перевод со счёта</span>
            <button className={s.cardLink} onClick={onReceipt}>Справка</button>
          </div>
          <div className={s.cardRow}>
            <div className={s.cardAvatar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#4da6ff" strokeWidth="2"/>
                <text x="12" y="16" textAnchor="middle" fill="#4da6ff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">₽</text>
              </svg>
            </div>
            <div className={s.cardInfo}>
              <span className={s.cardName}>Black</span>
              <span className={s.cardSub}>{formatAmount(blackBalance)} ₽</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#3a3a3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Requisites */}
        {op.phone && (
          <div className={s.card}>
            <span className={s.cardTitle}>Реквизиты</span>
            <div className={s.reqRow}>
              <span className={s.reqLabel}>Номер телефона</span>
              <span className={s.reqValue}>{op.phone}</span>
            </div>
          </div>
        )}

        {/* Details — управляется из настроек */}
        {showDetails && (
          <div className={s.card}>
            <span className={s.cardTitle}>Детали операции</span>
            <div className={s.detailsTable}>
              <div className={s.detailRow}>
                <span className={s.detailLabel}>Статус</span>
                <span className={s.detailValue} style={{ color: '#30d158' }}>{op.status}</span>
              </div>
              <div className={s.detailRow}>
                <span className={s.detailLabel}>Сумма</span>
                <span className={s.detailValue}>{formatAmount(Math.abs(op.amount))} ₽</span>
              </div>
              <div className={s.detailRow}>
                <span className={s.detailLabel}>Комиссия</span>
                <span className={s.detailValue}>{op.commission}</span>
              </div>
              <div className={s.detailRow}>
                <span className={s.detailLabel}>Отправитель</span>
                <span className={s.detailValue}>{senderName}</span>
              </div>
              <div className={s.detailRow}>
                <span className={s.detailLabel}>Получатель</span>
                <span className={s.detailValue}>{op.recipient}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation bottom sheet */}
      {showConfirm && (
        <ConfirmSheet
          recipient={op.recipient}
          onConfirm={() => onDelete(op.id)}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  )
}
