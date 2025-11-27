import { useState } from 'react';

function ChallengeItem({ challenge, onToggleComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(challenge.text);
  const getCategoryColors = () => {
    const colors = {
      wellness: { bg: 'rgba(16, 185, 129, 0.2)', text: '#34d399' },
      growth: { bg: 'rgba(59, 130, 246, 0.2)', text: '#60a5fa' },
      fun: { bg: 'rgba(245, 158, 11, 0.2)', text: '#fbbf24' },
      social: { bg: 'rgba(139, 92, 246, 0.2)', text: '#a78bfa' }
    };
    return colors[challenge.category] || { bg: 'rgba(100, 116, 139, 0.2)', text: '#94a3b8' };
  };

  const categoryColors = getCategoryColors();

  const handleEdit = () => {
    if (isEditing) {
      onEdit(challenge.id, editText);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '16px', background: challenge.completed ? '#2a2a2a' : '#2a2a2a', border: challenge.completed ? '1px solid #667eea' : '1px solid #333', transition: 'all 0.2s ease' }}>
      <div onClick={() => onToggleComplete(challenge.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '12px', background: challenge.completed ? 'linear-gradient(135deg, #667eea, #764ba2)' : categoryColors.bg, color: 'white', cursor: 'pointer' }}>
        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="currentColor">
          {challenge.icon}
        </svg>
      </div>
      
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
            style={{ width: '100%', padding: '8px', background: '#333', border: '1px solid #555', borderRadius: '8px', color: 'white', fontSize: '15px', outline: 'none' }}
            autoFocus
          />
        ) : (
          <div style={{ fontWeight: '500', fontSize: '15px', color: challenge.completed ? '#ccc' : 'white', textDecoration: challenge.completed ? 'line-through' : 'none', marginBottom: '2px' }}>
            {challenge.text}
          </div>
        )}
        <div style={{ fontSize: '12px', color: challenge.completed ? '#666' : '#888', textTransform: 'capitalize' }}>
          {challenge.category} {challenge.isDefault && '• Default'}
        </div>
      </div>
      
      {!challenge.isDefault && (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleEdit} style={{ padding: '6px', background: '#333', border: 'none', borderRadius: '6px', color: '#667eea', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isEditing ? (
              <svg style={{ width: '12px', height: '12px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            ) : (
              <svg style={{ width: '12px', height: '12px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            )}
          </button>
          <button onClick={() => onDelete(challenge.id)} style={{ padding: '6px', background: '#333', border: 'none', borderRadius: '6px', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: '12px', height: '12px' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
      )}
      
      <div onClick={() => onToggleComplete(challenge.id)} style={{ width: '24px', height: '24px', borderRadius: '50%', background: challenge.completed ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#333', border: challenge.completed ? 'none' : '2px solid #555', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        {challenge.completed && (
          <svg style={{ width: '12px', height: '12px', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        )}
      </div>
    </div>
  );
}

export default ChallengeItem;