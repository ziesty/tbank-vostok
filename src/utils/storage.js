const KEY = 'tbank_operations'

export function loadOperations() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveOperations(ops) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ops))
  } catch {
    // ignore
  }
}
