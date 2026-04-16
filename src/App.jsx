import { useState, useEffect } from 'react'
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
  const [screen, setScreen] = useState('list')
  const [operations, setOperations] = useState([])
  const [selectedOp, setSelectedOp] = useState(null)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

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
    setScreen('detail')
  }

  const handleSelectOp = (op) => {
    setSelectedOp(op)
    setScreen('detail')
  }

  const handleDelete = (id) => {
    const newOps = operations.filter(o => o.id !== id)
    setOperations(newOps)
    saveOperations(newOps)
    setScreen('list')
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
      background: '#1c1c1e',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {screen === 'list' && (
        <TransferList
          operations={operations}
          settings={settings}
          onSelect={handleSelectOp}
          onNewTransfer={() => setScreen('form')}
          onSettings={() => setScreen('settings')}
        />
      )}
      {screen === 'form' && (
        <TransferForm
          onBack={() => setScreen('list')}
          onCreate={handleCreate}
          settings={settings}
        />
      )}
      {screen === 'detail' && selectedOp && (
        <TransferDetail
          operation={selectedOp}
          settings={settings}
          onBack={() => setScreen('list')}
          onReceipt={() => setScreen('receipt')}
          onDelete={handleDelete}
        />
      )}
      {screen === 'receipt' && selectedOp && (
        <Receipt
          operation={selectedOp}
          onBack={() => setScreen('detail')}
        />
      )}
      {screen === 'settings' && (
        <Settings
          settings={settings}
          onBack={() => setScreen('list')}
          onSave={handleSaveSettings}
        />
      )}
    </div>
  )
}
