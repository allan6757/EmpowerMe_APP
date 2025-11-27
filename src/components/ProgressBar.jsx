function ProgressBar({ total, completed }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const getMoodMessage = () => {
    if (percentage === 100) return 'Outstanding performance achieved';
    if (percentage >= 75) return 'Excellent progress maintained';
    if (percentage >= 50) return 'Strong momentum building';
    if (percentage >= 25) return 'Good foundation established';
    return 'Ready to begin your journey';
  };



  return (
    <div style={{
      background: '#1a1a1a',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid #2a2a2a'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Today's Progress</h2>
          <p style={{ color: '#888', fontSize: '13px', margin: '4px 0 0 0' }}>{getMoodMessage()}</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
          borderRadius: '12px',
          padding: '8px 12px',
          minWidth: '60px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>{percentage}%</div>
        </div>
      </div>
      
      <div style={{
        height: '8px',
        background: '#2a2a2a',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #ff6b9d, #c44569)',
          width: `${percentage}%`,
          transition: 'width 0.8s ease-out',
          borderRadius: '4px'
        }}></div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666' }}>
        <span>{completed} completed</span>
        <span>{total - completed} remaining</span>
      </div>
    </div>
  );
}

export default ProgressBar;