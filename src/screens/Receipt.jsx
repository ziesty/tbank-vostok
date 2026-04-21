import StatusBar from '../components/StatusBar'
import { formatAmount, formatDateFull } from '../utils/format'
import s from './Receipt.module.css'

export default function Receipt({ operation: op, onBack }) {
  return (
    <div className={s.screen}>
      <StatusBar />

      <div className={s.header}>
        <span className={s.closeBtn} onClick={onBack}>Закрыть</span>
        <span className={s.headerTitle}>Квитанция</span>
        <button className={s.shareBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="18" cy="5" r="3" stroke="#4891f5" strokeWidth="2"/>
            <circle cx="6" cy="12" r="3" stroke="#4891f5" strokeWidth="2"/>
            <circle cx="18" cy="19" r="3" stroke="#4891f5" strokeWidth="2"/>
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="#4891f5" strokeWidth="2"/>
          </svg>
        </button>
      </div>

      <div className={s.scroll}>
        <div className={s.card}>
          {/* Logo */}
          <div className={s.logoWrap}>
            <img src="tbank-logo.png" className={s.logoImg} alt="T-Bank" />
          </div>

          {/* Date */}
          <span className={s.datetime}>{formatDateFull(op.date)}</span>

          {/* Total */}
          <div className={s.totalRow}>
            <span className={s.totalLabel}>Итого</span>
            <span className={s.totalAmount}>{formatAmount(Math.abs(op.amount))} ₽</span>
          </div>

          <div className={s.divider} />

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
          <div className={s.stampWrap}>
            <img src="podpis.png" className={s.stampImg} alt="" />
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
    </div>
  )
}
