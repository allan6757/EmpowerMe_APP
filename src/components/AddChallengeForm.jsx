import { useState } from 'react';

function AddChallengeForm({ onAddChallenge }) {
  const [challengeText, setChallengeText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('wellness');

  const categories = {
    wellness: { 
      name: 'Wellness', 
      icon: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>,
      color: 'emerald'
    },
    growth: { 
      name: 'Growth', 
      icon: <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>,
      color: 'blue'
    },
    fun: { 
      name: 'Fun', 
      icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>,
      color: 'orange'
    },
    social: { 
      name: 'Social', 
      icon: <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v7h2v7h3v-7h4z"/>,
      color: 'purple'
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (challengeText.trim()) {
      onAddChallenge(challengeText.trim(), selectedCategory);
      setChallengeText('');
    }
  };

  return (
    <div style={{
      background: '#1a1a1a',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid #2a2a2a'
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '20px', margin: '0 0 20px 0' }}>Add Challenge</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <textarea
            placeholder="What's your next challenge?"
            value={challengeText}
            onChange={(e) => setChallengeText(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              background: '#2a2a2a',
              border: '1px solid #333',
              borderRadius: '16px',
              color: 'white',
              fontSize: '15px',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit'
            }}
            rows={3}
          />
        </div>
        
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '12px',
                  border: selectedCategory === key ? '1px solid #ff6b9d' : '1px solid #333',
                  background: selectedCategory === key ? 'rgba(255, 107, 157, 0.1)' : '#2a2a2a',
                  color: selectedCategory === key ? '#ff6b9d' : '#ccc',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setSelectedCategory(key)}
              >
                <svg style={{ width: '14px', height: '14px' }} viewBox="0 0 24 24" fill="currentColor">
                  {category.icon}
                </svg>
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!challengeText.trim()}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '16px',
            background: challengeText.trim() ? 'linear-gradient(135deg, #ff6b9d, #c44569)' : '#333',
            color: 'white',
            fontWeight: '600',
            borderRadius: '16px',
            border: 'none',
            cursor: challengeText.trim() ? 'pointer' : 'not-allowed',
            opacity: challengeText.trim() ? 1 : 0.5,
            transition: 'all 0.2s ease',
            fontSize: '15px'
          }}
        >
          <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Add Challenge
        </button>
      </form>
    </div>
  );
}

export default AddChallengeForm;