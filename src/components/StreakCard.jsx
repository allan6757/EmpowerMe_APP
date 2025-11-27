import { useState, useEffect } from 'react';

function StreakCard({ progressData }) {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    const dates = Object.keys(progressData).sort();
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    dates.forEach(date => {
      const day = progressData[date];
      if (day.total > 0 && day.completed === day.total) {
        tempStreak++;
        maxStreak = Math.max(maxStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    });

    // Calculate current streak from today backwards
    const today = new Date().toISOString().split('T')[0];
    let checkDate = new Date();
    while (checkDate >= new Date(dates[0])) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const dayData = progressData[dateStr];
      if (dayData && dayData.total > 0 && dayData.completed === dayData.total) {
        currentStreak++;
      } else {
        break;
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }

    setStreak(currentStreak);
    setLongestStreak(maxStreak);
  }, [progressData]);

  return (
    <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '20px', border: '1px solid #2a2a2a' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <svg style={{ width: '20px', height: '20px', color: '#f59e0b' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
        </svg>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Your Streak</h3>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ textAlign: 'center', padding: '16px', background: '#2a2a2a', borderRadius: '12px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea', marginBottom: '4px' }}>
            {streak}
          </div>
          <div style={{ fontSize: '12px', color: '#888' }}>Current Streak</div>
        </div>
        
        <div style={{ textAlign: 'center', padding: '16px', background: '#2a2a2a', borderRadius: '12px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>
            {longestStreak}
          </div>
          <div style={{ fontSize: '12px', color: '#888' }}>Best Streak</div>
        </div>
      </div>

      <div style={{ marginTop: '16px', padding: '12px', background: 'linear-gradient(135deg, #667eea20, #764ba220)', borderRadius: '12px', border: '1px solid #667eea30' }}>
        <div style={{ fontSize: '14px', color: 'white', textAlign: 'center' }}>
          {streak === 0 ? 'Start your streak today!' : 
           streak === 1 ? 'Great start! Keep it going!' :
           streak < 7 ? `${streak} days strong! You're building momentum!` :
           `Amazing ${streak}-day streak! You're unstoppable!`}
        </div>
      </div>
    </div>
  );
}

export default StreakCard;