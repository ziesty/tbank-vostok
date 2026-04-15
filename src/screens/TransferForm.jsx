import { useState } from 'react'
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

export default function TransferForm({ onBack, onCreate }) {
  const [amount, setAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [recipient, setRecipient] = useState('')
  const [error, setError] = useState('')

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
    const raw = e.target.value
    setPhone(formatPhone(raw))
  }

  const handleAmount = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, '')
    const parts = val.split('.')
    if (parts.length > 2) return
    if (parts[1] && parts[1].length > 2) return
    setAmount(val)
  }

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
      sender: 'Ярослав Тюриков',
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
    <div className={s.container}>
      {/* Header */}
      <div className={s.header}>
        <button className={s.backBtn} onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#4da6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className={s.headerTitle}>Новый перевод</span>
        <div style={{ width: 36 }} />
      </div>

      <div className={s.body}>
        {/* Amount */}
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

        <div className={s.fields}>
          <div className={s.field}>
            <label className={s.label}>Номер телефона</label>
            <input
              className={s.input}
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhone}
            />
          </div>

          <div className={s.field}>
            <label className={s.label}>Имя получателя</label>
            <input
              className={s.input}
              type="text"
              placeholder="Фирузахон А."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              maxLength={60}
            />
          </div>
        </div>

        {error && <p className={s.error}>{error}</p>}

        {/* Preview */}
        {amount && recipient && (
          <div className={s.preview}>
            <div className={s.previewAvatar} style={{
              background: AVATAR_COLORS[0]
            }}>
              <span>{getInitial(recipient)}</span>
            </div>
            <div className={s.previewInfo}>
              <span className={s.previewName}>{recipient || '—'}</span>
              <span className={s.previewPhone}>{phone || 'Без номера'}</span>
            </div>
            <span className={s.previewAmount}>
              {amount ? `${formatAmount(parseFloat(amount))} ₽` : '—'}
            </span>
          </div>
        )}
      </div>

      <div className={s.footer}>
        <button
          className={s.submitBtn}
          onClick={handleSubmit}
          disabled={!amount || !phone || !recipient}
        >
          Создать операцию
        </button>
      </div>
    </div>
  )
}
