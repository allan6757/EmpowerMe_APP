import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function PartnerTracker({ user }) {
  const [partner, setPartner] = useState(null);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerProgress, setPartnerProgress] = useState({});
  const [error, setError] = useState('');

  const getUserStorage = (userId, key) => {
    const data = localStorage.getItem(`empowerme_${userId}_${key}`);
    return data ? JSON.parse(data) : null;
  };

  const getAllUsers = () => {
    const users = localStorage.getItem('empowerme_all_users');
    return users ? JSON.parse(users) : [];
  };

  const connectPartner = () => {
    setError('');
    const users = getAllUsers();
    const foundPartner = users.find(u => u.email === partnerEmail && u.uid !== user.uid);
    
    if (foundPartner) {
      setPartner(foundPartner);
      localStorage.setItem(`empowerme_${user.uid}_partner`, JSON.stringify(foundPartner));
      
      const progress = getUserStorage(foundPartner.uid, 'progress') || {};
      setPartnerProgress(progress);
    } else {
      setError('Partner not found. Please check the email address.');
    }
  };

  const disconnectPartner = () => {
    setPartner(null);
    setPartnerProgress({});
    localStorage.removeItem(`empowerme_${user.uid}_partner`);
  };

  useEffect(() => {
    const savedPartner = localStorage.getItem(`empowerme_${user.uid}_partner`);
    if (savedPartner) {
      const partnerData = JSON.parse(savedPartner);
      setPartner(partnerData);
      const progress = getUserStorage(partnerData.uid, 'progress') || {};
      setPartnerProgress(progress);
    }
  }, [user.uid]);

  const getPartnerStreak = () => {
    const dates = Object.keys(partnerProgress).sort();
    let streak = 0;
    let checkDate = new Date();
    
    while (checkDate >= new Date(dates[0])) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const dayData = partnerProgress[dateStr];
      if (dayData && dayData.total > 0 && dayData.completed === dayData.total) {
        streak++;
      } else {
        break;
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }
    return streak;
  };

  const getTodayProgress = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return partnerProgress[today] || { completed: 0, total: 0 };
  };

  return (
    <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '24px', border: '1px solid #2a2a2a' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <svg style={{ width: '20px', height: '20px', color: '#ec4899' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Partner Tracker</h3>
      </div>

      {!partner ? (
        <div>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>
            Connect with your partner to track each other's progress and stay motivated together!
          </p>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="email"
              placeholder="Partner's email address"
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              style={{
                flex: 1,
                padding: '12px',
                background: '#2a2a2a',
                border: '1px solid #333',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={connectPartner}
              style={{
                padding: '12px 16px',
                background: 'linear-gradient(135deg, #ec4899, #be185d)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Connect
            </button>
          </div>
          
          {error && (
            <div style={{ padding: '12px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '12px', color: '#dc2626', fontSize: '14px' }}>
              {error}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>{partner.name}</div>
              <div style={{ fontSize: '12px', color: '#888' }}>{partner.email}</div>
            </div>
            <button
              onClick={disconnectPartner}
              style={{
                padding: '6px 12px',
                background: '#333',
                border: 'none',
                borderRadius: '8px',
                color: '#ef4444',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Disconnect
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '16px', background: '#2a2a2a', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>
                {getPartnerStreak()}
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>Current Streak</div>
            </div>
            
            <div style={{ padding: '16px', background: '#2a2a2a', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>
                {getTodayProgress().completed}/{getTodayProgress().total}
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>Today's Progress</div>
            </div>
          </div>

          <div style={{ padding: '16px', background: 'linear-gradient(135deg, #ec489920, #be185d20)', borderRadius: '12px', border: '1px solid #ec489930' }}>
            <div style={{ fontSize: '14px', color: 'white', textAlign: 'center' }}>
              {getTodayProgress().completed === getTodayProgress().total && getTodayProgress().total > 0
                ? `${partner.name} completed all challenges today! 🎉`
                : `${partner.name} is ${Math.round((getTodayProgress().completed / Math.max(getTodayProgress().total, 1)) * 100)}% done today`
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PartnerTracker;