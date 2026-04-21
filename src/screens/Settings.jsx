import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import { formatAmount } from '../utils/format'
import s from './Settings.module.css'

function randomBetween(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a
}

function randomRealisticStats() {
  const spent = randomBetween(8000, 120000)
  const income = randomBetween(Math.round(spent * 0.9), Math.round(spent * 2.5))
  const balance = randomBetween(500, 250000) + Math.random()
  return {
    totalSpent: spent,
    totalIncome: income,
    blackBalance: Math.round(balance * 100) / 100,
  }
}

function Toggle({ value, onChange }) {
  return (
    <button
      className={`${s.toggle} ${value ? s.toggleOn : ''}`}
      onClick={() => onChange(!value)}
      role="switch"
      aria-checked={value}
    >
      <div className={s.toggleThumb} />
    </button>
  )
}

export default function Settings({ settings, onBack, onSave }) {
  const [form, setForm] = useState({ ...settings })
  const [saved, setSaved] = useState(false)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = () => {
    const next = {
      ...form,
      blackBalance: parseFloat(String(form.blackBalance).replace(',', '.')) || 0,
      totalSpent: parseFloat(String(form.totalSpent).replace(',', '.')) || 0,
      totalIncome: parseFloat(String(form.totalIncome).replace(',', '.')) || 0,
    }
    onSave(next)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const handleRandomStats = () => {
    const r = randomRealisticStats()
    setForm(f => ({ ...f, ...r }))
  }

  return (
    <div className={s.screen}>
      <StatusBar />

      <div className={s.header}>
        <button className={s.backBtn} onClick={onBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#4891f5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className={s.headerTitle}>Настройки</span>
        <div style={{ width: 34 }} />
      </div>

      <div className={s.scroll}>

        {/* Отправитель */}
        <div className={s.section}>
          <span className={s.sectionTitle}>Отправитель</span>
          <div className={s.card}>
            <div>
              <label className={s.fieldLabel}>Имя отправителя</label>
              <input
                className={s.input}
                value={form.senderName}
                onChange={e => set('senderName', e.target.value)}
                placeholder="Иван Иванов"
              />
            </div>
          </div>
        </div>

        {/* Счёт */}
        <div className={s.section}>
          <span className={s.sectionTitle}>Счёт Black</span>
          <div className={s.card}>
            <div>
              <label className={s.fieldLabel}>Остаток на счёте (₽)</label>
              <input
                className={s.input}
                inputMode="decimal"
                value={form.blackBalance}
                onChange={e => set('blackBalance', e.target.value)}
                placeholder="6916.54"
              />
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className={s.section}>
          <div className={s.sectionRow}>
            <span className={s.sectionTitle}>Траты и доходы</span>
            <button className={s.randomBtn} onClick={handleRandomStats}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M1 4v6h6M23 20v-6h-6" stroke="#4891f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="#4891f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Случайное
            </button>
          </div>
          <div className={s.card}>
            <div className={s.row}>
              <div className={s.halfField}>
                <label className={s.fieldLabel}>Траты (₽)</label>
                <input
                  className={s.input}
                  inputMode="decimal"
                  value={form.totalSpent}
                  onChange={e => set('totalSpent', e.target.value)}
                  placeholder="31263"
                />
              </div>
              <div className={s.halfField}>
                <label className={s.fieldLabel}>Доходы (₽)</label>
                <input
                  className={s.input}
                  inputMode="decimal"
                  value={form.totalIncome}
                  onChange={e => set('totalIncome', e.target.value)}
                  placeholder="57655"
                />
              </div>
            </div>
            <div className={s.statsPreview}>
              <div className={s.statPill}>
                <span className={s.statPillVal}>{formatAmount(parseFloat(form.totalSpent) || 0)} ₽</span>
                <span className={s.statPillLabel}>Траты</span>
              </div>
              <div className={s.statPill}>
                <span className={s.statPillVal}>{formatAmount(parseFloat(form.totalIncome) || 0)} ₽</span>
                <span className={s.statPillLabel}>Доходы</span>
              </div>
            </div>
          </div>
        </div>

        {/* Отображение */}
        <div className={s.section}>
          <span className={s.sectionTitle}>Отображение</span>
          <div className={s.card}>
            <div className={s.toggleRow}>
              <div className={s.toggleInfo}>
                <span className={s.toggleLabel}>Детали операции</span>
                <span className={s.toggleSub}>Показывать блок «Детали операции» в окне перевода</span>
              </div>
              <Toggle
                value={form.showOperationDetails}
                onChange={v => set('showOperationDetails', v)}
              />
            </div>
          </div>
        </div>

      </div>

      <div className={s.footer}>
        <button className={`${s.saveBtn} ${saved ? s.saveBtnDone : ''}`} onClick={handleSave}>
          {saved ? '✓ Сохранено' : 'Сохранить'}
        </button>
      </div>
    </div>
  )
}
