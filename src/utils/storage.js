const OPS_KEY = 'tbank_operations'
const SETTINGS_KEY = 'tbank_settings'

export function loadOperations() {
  try {
    const raw = localStorage.getItem(OPS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function saveOperations(ops) {
  try { localStorage.setItem(OPS_KEY, JSON.stringify(ops)) } catch {}
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

export function saveSettings(s) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)) } catch {}
}
