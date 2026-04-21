export default function SpendBar({ green = false }) {
  if (green) {
    return (
      <div style={{ height: 6, borderRadius: 3, background: '#34c759', marginTop: 8 }} />
    )
  }
  return (
    <div style={{ height: 6, borderRadius: 3, background: '#e5e5ea', overflow: 'hidden', marginTop: 8 }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ width: '38%', background: 'linear-gradient(90deg,#4af,#29c)' }} />
        <div style={{ width: '18%', background: '#ff9500' }} />
        <div style={{ width: '12%', background: '#af52de' }} />
        <div style={{ width: '8%',  background: '#ff2d55' }} />
        <div style={{ width: '8%',  background: '#34c759' }} />
        <div style={{ width: '6%',  background: '#5ac8fa' }} />
      </div>
    </div>
  )
}
