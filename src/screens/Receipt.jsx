import { formatAmount, formatDateFull } from '../utils/format'
import s from './Receipt.module.css'

export default function Receipt({ operation: op, onBack }) {
  return (
    <div className={s.container}>
      {/* Header */}
      <div className={s.header}>
        <button className={s.backBtn} onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#4da6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className={s.headerTitle}>Квитанция</span>
        <button className={s.shareBtn}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="18" cy="5" r="3" stroke="#4da6ff" strokeWidth="2"/>
            <circle cx="6" cy="12" r="3" stroke="#4da6ff" strokeWidth="2"/>
            <circle cx="18" cy="19" r="3" stroke="#4da6ff" strokeWidth="2"/>
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="#4da6ff" strokeWidth="2"/>
          </svg>
        </button>
      </div>

      <div className={s.scroll}>
        {/* Logo */}
        <div className={s.logoWrap}>
          <div className={s.logoShield}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v5c0 5.25 3.4 10.15 8 11.35C16.6 21.15 20 16.25 20 11V6L12 2z" fill="#1c1c1e"/>
              <text x="12" y="17" textAnchor="middle" fill="#FFDD2D" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">T</text>
            </svg>
          </div>
        </div>

        {/* Date & total */}
        <div className={s.section}>
          <span className={s.datetime}>{formatDateFull(op.date)}</span>
          <div className={s.totalRow}>
            <span className={s.totalLabel}>Итого</span>
            <span className={s.totalAmount}>{formatAmount(Math.abs(op.amount))} ₽</span>
          </div>
          <div className={s.divider} />
        </div>

        {/* Details table */}
        <div className={s.table}>
          <div className={s.tableRow}>
            <span className={s.tLabel}>Перевод</span>
            <span className={s.tValue}>По номеру телефона</span>
          </div>
          <div className={s.tableRow}>
            <span className={s.tLabel}>Статус</span>
            <span className={s.tValue}>{op.status}</span>
          </div>
          <div className={s.tableRow}>
            <span className={s.tLabel}>Сумма</span>
            <span className={s.tValue}>{formatAmount(Math.abs(op.amount))} ₽</span>
          </div>
          <div className={s.tableRow}>
            <span className={s.tLabel}>Комиссия</span>
            <span className={s.tValue}>{op.commission}</span>
          </div>
          <div className={s.tableRow}>
            <span className={s.tLabel}>Отправитель</span>
            <span className={s.tValue}>{op.sender}</span>
          </div>
          {op.phone && (
            <div className={s.tableRow}>
              <span className={s.tLabel}>Телефон получателя</span>
              <span className={s.tValue}>{op.phone}</span>
            </div>
          )}
          <div className={s.tableRow}>
            <span className={s.tLabel}>Получатель</span>
            <span className={s.tValue}>{op.recipient}</span>
          </div>
        </div>

        {/* Stamp */}
        <div className={s.stamp}>
          <div className={s.stampBox}>
            <p className={s.stampLine}>АО «ТБАНК»</p>
            <p className={s.stampLine}>БИК 044525974 ИНН 7710140679</p>
            <p className={s.stampLine}>К/С 30101810145250000974</p>
            <p className={s.stampLine}>ШАДРИНА Е. С.</p>
            <div className={s.signatureWrap}>
              <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                <path d="M5 30 Q15 10 25 25 Q35 38 45 20 Q55 5 70 15 Q78 20 75 28" stroke="#1a3a8c" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M8 32 Q20 28 35 30" stroke="#1a3a8c" strokeWidth="1" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className={s.divider} />

        {/* Footer */}
        <div className={s.footer}>
          <p className={s.footerReceipt}>Квитанция № {op.receiptNo}</p>
          <p className={s.footerNote}>По вопросам зачисления обращайтесь к получателю</p>
          <p className={s.footerSupport}>
            Служба поддержки{' '}
            <span className={s.footerLink}>fb@tbank.ru</span>
          </p>
        </div>
      </div>
    </div>
  )
}
