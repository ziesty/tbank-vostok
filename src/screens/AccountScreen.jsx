import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import SpendBar from '../components/SpendBar'
import { formatAmount } from '../utils/format'
import s from './AccountScreen.module.css'

const BONUS_CATEGORIES = [
  { title: 'Кэшбэк\nдо 30%', badge: 28, circles: ['#7c3aed', '#7c3aed', '#dc2626'] },
  { title: 'Повышенный\nкэшбэк в апреле', circles: ['#6366f1', '#f97316', '#06b6d4', '#ec4899'] },
  { title: 'Повышенный\nкэшбэк в апр.', circles: ['#3b82f6'] },
]

const ACCOUNT_DETAILS = [
  { label: 'Лимиты на переводы, снятия и пополнения' },
  { label: 'Привязан к 1 сервису', sub: 'Сервисы Яндекса' },
  { label: 'Тариф' },
  { label: 'Выписки и справки' },
  { label: 'Услуги' },
  { label: 'Заблокировать карту', red: true },
]

export default function AccountScreen({ settings, onBack, onTransfer, onOperations }) {
  const balance = formatAmount(settings.blackBalance)

  return (
    <div className={s.screen}>
      {/* Dark header */}
      <div className={s.darkHeader}>
        <StatusBar dark />
        <div className={s.headerRow}>
          <button className={s.backBtn} onClick={onBack}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className={s.headerTitle}>Главная</span>
          <div className={s.headerRight}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polyline points="20 12 20 22 4 22 4 12" stroke="#4891f5" strokeWidth="1.8" fill="none"/>
              <rect x="2" y="7" width="20" height="5" stroke="#4891f5" strokeWidth="1.8" fill="none"/>
              <line x1="12" y1="22" x2="12" y2="7" stroke="#4891f5" strokeWidth="1.8"/>
              <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="#4891f5" strokeWidth="1.8" fill="none"/>
            </svg>
          </div>
        </div>
        <div className={s.balanceArea}>
          <div className={s.balanceName}>Black</div>
          <div className={s.balanceAmount}>{balance} ₽</div>
          <div className={s.cardRow}>
            <div className={s.cardChip}>
              <span className={s.cardNum}>5578</span>
              <span className={s.cardMir}>МИР</span>
            </div>
          </div>
        </div>
      </div>

      <div className={s.content}>
        {/* Actions */}
        <div className={s.actionsCard}>
          <div className={s.actionRow}>
            <div className={s.actionItem}>
              <div className={s.actionIcon} style={{ background: '#e8f0fe' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <line x1="12" y1="5" x2="12" y2="19" stroke="#4891f5" strokeWidth="2.2" strokeLinecap="round"/>
                  <line x1="5" y1="12" x2="19" y2="12" stroke="#4891f5" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className={s.actionLabel} style={{ color: '#4891f5' }}>Пополнить{'\n'}счет</span>
            </div>
            <div className={s.actionDivider} />
            <div className={s.actionItem} onClick={onTransfer} style={{ cursor: 'pointer' }}>
              <div className={s.actionIcon} style={{ background: '#e8f0fe' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="#4891f5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={s.actionLabel} style={{ color: '#4891f5' }}>Оплатить{'\n'}или перевести</span>
            </div>
          </div>
        </div>

        {/* Operations + Cashback */}
        <div className={s.miniGrid}>
          <div className={s.miniCard} style={{ cursor: 'pointer' }} onClick={onOperations}>
            <div className={s.miniTitle}>Операции{'\n'}по счету</div>
            <div className={s.miniSub}>Трат в апреле</div>
            <div className={s.miniAmount}>{formatAmount(settings.totalSpent)} ₽</div>
            <SpendBar />
          </div>
          <div className={s.miniCard} style={{ background: '#1c1c1e' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M2 19h20M3 19l2-9 5 4 2-7 2 7 5-4 2 9H3z" stroke="#FFDD2D" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
              </svg>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>9 Р</span>
            </div>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Накоплено{'\n'}кэшбэка</div>
            <div style={{ color: '#8e8e93', fontSize: 11, marginTop: 4 }}>Зачислится{'\n'}17 мая</div>
          </div>
        </div>

        {/* Autopay */}
        <div className={s.card}>
          <div className={s.autopayRow}>
            <div>
              <div className={s.cardTitle}>Автопополнение</div>
              <div className={s.cardSub}>Black всегда будет в плюсе</div>
            </div>
            <button className={s.btnYellow}>Настроить</button>
          </div>
        </div>

        {/* Bonuses */}
        <div className={s.sectionHeader}>
          <span className={s.sectionTitle}>Бонусы по Black</span>
          <span className={s.sectionLink}>Все</span>
        </div>
        <div className={s.bonusScroll}>
          {BONUS_CATEGORIES.map((c, i) => (
            <div key={i} className={s.bonusCard}>
              {c.badge && <div className={s.bonusBadge}>{c.badge}</div>}
              <div className={s.bonusTitle}>{c.title}</div>
              <div className={s.bonusCircles}>
                {c.circles.map((col, j) => (
                  <div key={j} className={s.bonusCircle} style={{ background: col }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Requisites */}
        <div className={s.card}>
          <div className={s.requisiteRow}>
            <div>
              <div className={s.cardTitle}>Реквизиты</div>
              <div className={s.cardSub}>Номер договора 5338312260</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="#4891f5" strokeWidth="1.8" fill="none"/>
              <polyline points="17 8 12 3 7 8" stroke="#4891f5" strokeWidth="1.8" fill="none"/>
              <line x1="12" y1="3" x2="12" y2="15" stroke="#4891f5" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* QR + Link */}
        <div className={s.miniGrid}>
          {[
            { title: 'QR-код', sub: 'Для пополнения' },
            { title: 'Ссылка', sub: 'www.tbank.ru/rm/' },
          ].map((it, i) => (
            <div key={i} className={s.card} style={{ margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{it.title}</div>
                <div style={{ fontSize: 11, color: '#8e8e93', marginTop: 2 }}>{it.sub}</div>
              </div>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" stroke="#4891f5" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Account details */}
        <div className={s.sectionHeader} style={{ marginTop: 4 }}>
          <span className={s.sectionTitle}>Детали счета</span>
        </div>
        <div className={s.detailsList}>
          {ACCOUNT_DETAILS.map((item, i) => (
            <div key={i} className={s.detailItem} style={{ borderBottom: i < ACCOUNT_DETAILS.length - 1 ? '1px solid #f2f2f7' : 'none' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: item.red ? '#ff3b30' : '#1c1c1e' }}>{item.label}</div>
                {item.sub && <div style={{ fontSize: 12, color: '#8e8e93', marginTop: 1 }}>{item.sub}</div>}
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
      <BottomNav dark />
    </div>
  )
}
