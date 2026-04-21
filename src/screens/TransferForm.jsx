import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { formatAmount } from '../utils/format'
import s from './TransferForm.module.css'

function generateId() {
  return 'op-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7)
}

function generateReceiptNo() {
  return [1, ...Array(4).fill(0).map(() => Math.floor(Math.random() * 900) + 100)]
    .join('-')
}

function getInitial(name) {
  return (name || '?').trim()[0].toUpperCase()
}

const AVATAR_COLORS = ['#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c', '#0891b2']

export default function TransferForm({ onBack, onCreate, settings }) {
  const [amount, setAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [recipient, setRecipient] = useState('')
  const [error, setError] = useState('')

  const blackBalance = formatAmount(settings?.blackBalance ?? 6916.54)

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (!digits) return ''
    let result = '+7'
    if (digits.length > 1) result += ' (' + digits.slice(1, 4)
    if (digits.length > 4) result += ') ' + digits.slice(4, 7)
    if (digits.length > 7) result += '-' + digits.slice(7, 9)
    if (digits.length > 9) result += '-' + digits.slice(9, 11)
    return result
  }

  const handlePhone = (e) => {
    setPhone(formatPhone(e.target.value))
  }

  const handleAmount = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, '')
    const parts = val.split('.')
    if (parts.length > 2) return
    if (parts[1] && parts[1].length > 2) return
    setAmount(val)
  }

  const isReady = amount && parseFloat(amount) > 0 &&
    phone.replace(/\D/g, '').length >= 11 &&
    recipient.trim().length > 0

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Введите корректную сумму')
      return
    }
    if (!phone || phone.replace(/\D/g, '').length < 11) {
      setError('Введите корректный номер телефона')
      return
    }
    if (!recipient.trim()) {
      setError('Введите имя получателя')
      return
    }

    const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]
    const op = {
      id: generateId(),
      amount: -parseFloat(amount),
      phone,
      recipient: recipient.trim(),
      sender: settings?.senderName || 'Отправитель',
      date: new Date().toISOString(),
      status: 'Успешно',
      commission: 'Без комиссии',
      receiptNo: generateReceiptNo(),
      type: 'transfer',
      avatar: getInitial(recipient),
      avatarColor: color,
    }

    onCreate(op)
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
        <span className={s.headerTitle}>Перевод по телефону</span>
        <div style={{ width: 34 }} />
      </div>

      <div className={s.body}>
        {/* Amount */}
        <div className={s.amountCard}>
          <div className={s.amountWrap}>
            <input
              className={s.amountInput}
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={amount}
              onChange={handleAmount}
            />
            <span className={s.currency}>₽</span>
          </div>
        </div>

        {/* Phone + Name */}
        <div className={s.fieldCard}>
          <div className={s.fieldRow}>
            <span className={s.label}>Номер телефона</span>
            <input
              className={s.input}
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhone}
            />
          </div>
          <div className={s.fieldRow}>
            <span className={s.label}>Имя получателя</span>
            <input
              className={s.input}
              type="text"
              placeholder="Фирузахон А."
              value={recipient}
              onChange={(e) => { setRecipient(e.target.value); setError('') }}
              maxLength={60}
            />
          </div>
        </div>

        {/* From account */}
        <p className={s.accountCardLabel}>Списать с</p>
        <div className={s.accountCard}>
          <div className={s.accountIcon}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>₽</span>
          </div>
          <div className={s.accountInfo}>
            <div className={s.accountName}>Black</div>
            <div className={s.accountBalance}>{blackBalance} ₽</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {error && <p className={s.error}>{error}</p>}
      </div>

      <div className={s.footer}>
        <button
          className={`${s.submitBtn} ${isReady ? s.submitBtnActive : s.submitBtnDisabled}`}
          onClick={handleSubmit}
          disabled={!isReady}
        >
          Перевести
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
