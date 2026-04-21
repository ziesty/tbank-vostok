import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { formatAmount, formatDate } from '../utils/format'
import s from './TransferDetail.module.css'

function ConfirmSheet({ recipient, onConfirm, onCancel }) {
  return (
    <>
      <div className={s.overlay} onClick={onCancel} />
      <div className={s.sheet}>
        <div className={s.sheetHandle} />
        <div className={s.sheetIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <polyline points="3 6 5 6 21 6" stroke="#ff3b30" strokeWidth="2" strokeLinecap="round"/>
            <path d="M19 6l-1 14H6L5 6" stroke="#ff3b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 11v6M14 11v6" stroke="#ff3b30" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 6V4h6v2" stroke="#ff3b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className={s.sheetTitle}>Удалить операцию?</p>
        <p className={s.sheetSub}>
          Перевод <span className={s.sheetName}>{recipient}</span> будет удалён из истории.
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
  const blackBalance = formatAmount(settings?.blackBalance ?? 6916.54)
  const senderName = op.sender || settings?.senderName || 'Отправитель'
  const showDetails = settings?.showOperationDetails ?? true

  return (
    <div className={s.screen}>
      <StatusBar />

      {/* Date + close + delete */}
      <div className={s.topBar}>
        <span className={s.dateText}>{day} {month} • {hours}:{mins}</span>
        <div className={s.topActions}>
          <button className={s.deleteBtn} onClick={() => setShowConfirm(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polyline points="3 6 5 6 21 6" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M19 6l-1 14H6L5 6" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11v6M14 11v6" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M9 6V4h6v2" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={s.closeBtn} onClick={onBack}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#8e8e93" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={s.content}>
        {/* Logo + name + amount */}
        <div className={s.hero}>
          <div className={s.heroLogo}>
            <img src="tbank-logo.png" style={{ width: 72, height: 72, borderRadius: 36, objectFit: 'cover' }} />
          </div>
          <div className={s.heroName}>{op.recipient}</div>
          <div className={s.heroBadges}>
            <div className={s.badge}>
              <span>🔄</span>
              <span className={s.badgeText}>{isTransfer ? 'Переводы' : 'Покупки'}</span>
            </div>
            <div className={s.editBadge}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#8e8e93" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#8e8e93" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className={s.heroAmount} style={{ color: isPositive ? '#34c759' : '#1c1c1e' }}>
            {isPositive ? '+' : '-'}{formatAmount(Math.abs(op.amount))} ₽
          </div>
        </div>

        {/* Quick actions */}
        <div className={s.quickActions}>
          {[
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#4891f5" strokeWidth="1.8" fill="none" strokeLinejoin="round"/></svg>, label: 'Избранное' },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" stroke="#4891f5" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>, label: 'Повторить' },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="#4891f5" strokeWidth="1.8" fill="none" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="#4891f5" strokeWidth="1.8" strokeLinecap="round"/></svg>, label: 'Не учитывать' },
          ].map(({ icon, label }) => (
            <div key={label} className={s.quickItem}>
              {icon}
              <span className={s.quickLabel}>{label}</span>
            </div>
          ))}
        </div>

        {/* Transfer block */}
        <div className={s.card}>
          <div className={s.cardHeader}>
            <span className={s.cardTitle}>Перевод</span>
            <span className={s.cardLink} onClick={onReceipt}>Справка</span>
          </div>
          <div className={s.accountRow}>
            <div className={s.accountIcon}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>₽</span>
            </div>
            <div className={s.accountInfo}>
              <div className={s.accountName}>Black</div>
              <div className={s.accountSub}>{blackBalance} ₽</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Requisites */}
        {op.phone && (
          <div className={s.card} style={{ marginTop: 10 }}>
            <div className={s.cardTitle} style={{ marginBottom: 10 }}>Реквизиты</div>
            <div style={{ borderTop: '1px solid #f2f2f7', paddingTop: 10 }}>
              <div style={{ fontSize: 12, color: '#8e8e93', marginBottom: 4 }}>Номер телефона</div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{op.phone}</div>
            </div>
          </div>
        )}

        {/* Details (conditional) */}
        {showDetails && (
          <div className={s.card} style={{ marginTop: 10 }}>
            <div className={s.cardTitle} style={{ marginBottom: 10 }}>Детали операции</div>
            {[
              ['Статус', op.status, '#34c759'],
              ['Сумма', `${formatAmount(Math.abs(op.amount))} ₽`, null],
              ['Комиссия', op.commission, null],
              ['Отправитель', senderName, null],
              ['Получатель', op.recipient, null],
            ].map(([label, value, color]) => (
              <div key={label} className={s.detailRow}>
                <span className={s.detailLabel}>{label}</span>
                <span className={s.detailValue} style={color ? { color } : {}}>{value}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ height: 30 }} />
      </div>

      <BottomNav />

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
