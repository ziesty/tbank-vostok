import { useState, useEffect } from 'react'
import TransferList from './screens/TransferList'
import TransferDetail from './screens/TransferDetail'
import TransferForm from './screens/TransferForm'
import Receipt from './screens/Receipt'
import { loadOperations, saveOperations } from './utils/storage'
import { MOCK_OPERATIONS } from './utils/mockData'

export default function App() {
  const [screen, setScreen] = useState('list') // 'list' | 'detail' | 'form' | 'receipt'
  const [operations, setOperations] = useState([])
  const [selectedOp, setSelectedOp] = useState(null)

  useEffect(() => {
    const stored = loadOperations()
    if (stored.length > 0) {
      setOperations(stored)
    } else {
      setOperations(MOCK_OPERATIONS)
      saveOperations(MOCK_OPERATIONS)
    }
  }, [])

  const handleCreate = (op) => {
    const newOps = [op, ...operations]
    setOperations(newOps)
    saveOperations(newOps)
    setSelectedOp(op)
    setScreen('detail')
  }

  const handleSelectOp = (op) => {
    setSelectedOp(op)
    setScreen('detail')
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: 430,
      minHeight: '100dvh',
      background: '#1c1c1e',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {screen === 'list' && (
        <TransferList
          operations={operations}
          onSelect={handleSelectOp}
          onNewTransfer={() => setScreen('form')}
        />
      )}
      {screen === 'form' && (
        <TransferForm
          onBack={() => setScreen('list')}
          onCreate={handleCreate}
        />
      )}
      {screen === 'detail' && selectedOp && (
        <TransferDetail
          operation={selectedOp}
          onBack={() => setScreen('list')}
          onReceipt={() => setScreen('receipt')}
        />
      )}
      {screen === 'receipt' && selectedOp && (
        <Receipt
          operation={selectedOp}
          onBack={() => setScreen('detail')}
        />
      )}
    </div>
  )
}
