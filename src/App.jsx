import { useState, useEffect } from 'react'
import HomeScreen from './screens/HomeScreen'
import AccountScreen from './screens/AccountScreen'
import TransferList from './screens/TransferList'
import TransferDetail from './screens/TransferDetail'
import TransferForm from './screens/TransferForm'
import Receipt from './screens/Receipt'
import Settings from './screens/Settings'
import { loadOperations, saveOperations, loadSettings, saveSettings } from './utils/storage'
import { MOCK_OPERATIONS } from './utils/mockData'

export const DEFAULT_SETTINGS = {
  senderName: 'Ярослав Тюриков',
  blackBalance: 6916.54,
  totalSpent: 31263,
  totalIncome: 57655,
  showOperationDetails: true,
}

export default function App() {
  // navStack: array of screen names, current is last element
  const [navStack, setNavStack] = useState(['home'])
  const [operations, setOperations] = useState([])
  const [selectedOp, setSelectedOp] = useState(null)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const screen = navStack[navStack.length - 1]

  const push = (s) => setNavStack(prev => [...prev, s])
  const pop = () => setNavStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev)
  const popTo = (s) => setNavStack(prev => {
    const idx = prev.lastIndexOf(s)
    return idx >= 0 ? prev.slice(0, idx + 1) : [...prev, s]
  })
  const replace = (s) => setNavStack(prev => [...prev.slice(0, -1), s])

  useEffect(() => {
    const stored = loadOperations()
    setOperations(stored.length > 0 ? stored : (() => {
      saveOperations(MOCK_OPERATIONS)
      return MOCK_OPERATIONS
    })())
    setSettings({ ...DEFAULT_SETTINGS, ...loadSettings() })
  }, [])

  const handleCreate = (op) => {
    const enriched = { ...op, sender: settings.senderName }
    const newOps = [enriched, ...operations]
    setOperations(newOps)
    saveOperations(newOps)
    setSelectedOp(enriched)
    replace('detail')
  }

  const handleSelectOp = (op) => {
    setSelectedOp(op)
    push('detail')
  }

  const handleDelete = (id) => {
    const newOps = operations.filter(o => o.id !== id)
    setOperations(newOps)
    saveOperations(newOps)
    pop()
  }

  const handleSaveSettings = (next) => {
    setSettings(next)
    saveSettings(next)
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: 430,
      minHeight: '100dvh',
      background: '#f2f2f7',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {screen === 'home' && (
        <HomeScreen
          settings={settings}
          onAccount={() => push('account')}
          onOperations={() => push('list')}
          onTransfer={() => push('form')}
          onSettings={() => push('settings')}
        />
      )}
      {screen === 'account' && (
        <AccountScreen
          settings={settings}
          onBack={pop}
          onOperations={() => push('list')}
          onTransfer={() => push('form')}
        />
      )}
      {screen === 'list' && (
        <TransferList
          operations={operations}
          settings={settings}
          onSelect={handleSelectOp}
          onNewTransfer={() => push('form')}
          onSettings={() => push('settings')}
        />
      )}
      {screen === 'form' && (
        <TransferForm
          onBack={pop}
          onCreate={handleCreate}
          settings={settings}
        />
      )}
      {screen === 'detail' && selectedOp && (
        <TransferDetail
          operation={selectedOp}
          settings={settings}
          onBack={pop}
          onReceipt={() => push('receipt')}
          onDelete={handleDelete}
        />
      )}
      {screen === 'receipt' && selectedOp && (
        <Receipt
          operation={selectedOp}
          onBack={pop}
        />
      )}
      {screen === 'settings' && (
        <Settings
          settings={settings}
          onBack={pop}
          onSave={handleSaveSettings}
        />
      )}
    </div>
  )
}
