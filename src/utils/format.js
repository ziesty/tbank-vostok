export function formatAmount(amount) {
  const abs = Math.abs(amount)
  const formatted = abs % 1 === 0
    ? abs.toLocaleString('ru-RU')
    : abs.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return formatted
}

export function formatDate(isoString) {
  const d = new Date(isoString)
  const day = d.getDate()
  const months = ['января','февраля','марта','апреля','мая','июня',
                  'июля','августа','сентября','октября','ноября','декабря']
  const month = months[d.getMonth()]
  const hours = String(d.getHours()).padStart(2, '0')
  const mins = String(d.getMinutes()).padStart(2, '0')
  return { day, month, hours, mins, year: d.getFullYear() }
}

export function formatDateShort(isoString) {
  const d = new Date(isoString)
  const { day, month } = formatDate(isoString)
  return `${day} ${month}`
}

export function formatDateFull(isoString) {
  const d = new Date(isoString)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${dd}.${mm}.${yyyy}  ${hh}:${min}:${ss}`
}

export function groupByDate(operations) {
  const groups = []
  const seen = {}
  for (const op of operations) {
    const d = new Date(op.date)
    const key = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
    if (!seen[key]) {
      seen[key] = true
      groups.push({ dateKey: key, date: op.date, items: [op] })
    } else {
      groups[groups.length - 1].items.push(op)
    }
  }
  return groups
}
