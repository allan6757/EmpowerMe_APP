import { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

function WeeklyPrizes({ user, progressData }) {
  const [weeklyStats, setWeeklyStats] = useState({});
  const [availablePrizes, setAvailablePrizes] = useState([]);
  const [claimedPrizes, setClaimedPrizes] = useState([]);

  const prizes = [
    { id: 1, name: 'Consistency Champion', requirement: 7, type: 'streak', reward: 'Gold Badge', points: 100 },
    { id: 2, name: 'Weekly Warrior', requirement: 5, type: 'days', reward: 'Energy Boost', points: 75 },
    { id: 3, name: 'Goal Getter', requirement: 21, type: 'challenges', reward: 'Target Master', points: 50 },
    { id: 4, name: 'Participation Pro', requirement: 3, type: 'days', reward: 'Star Player', points: 25 }
  ];

  useEffect(() => {
    calculateWeeklyStats();
  }, [progressData]);

  useEffect(() => {
    checkAvailablePrizes();
    loadClaimedPrizes();
  }, [weeklyStats]);

  const calculateWeeklyStats = () => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    let totalChallenges = 0;
    let completedDays = 0;
    let currentStreak = 0;
    let tempStreak = 0;

    weekDays.forEach(day => {
      const dateKey = format(day, 'yyyy-MM-dd');
      const dayData = progressData[dateKey];
      
      if (dayData && dayData.total > 0) {
        totalChallenges += dayData.completed;
        if (dayData.completed === dayData.total) {
          completedDays++;
          tempStreak++;
          currentStreak = Math.max(currentStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      }
    });

    setWeeklyStats({
      totalChallenges,
      completedDays,
      currentStreak,
      weekProgress: Math.round((completedDays / 7) * 100)
    });
  };

  const checkAvailablePrizes = () => {
    const available = prizes.filter(prize => {
      switch (prize.type) {
        case 'streak':
          return weeklyStats.currentStreak >= prize.requirement;
        case 'days':
          return weeklyStats.completedDays >= prize.requirement;
        case 'challenges':
          return weeklyStats.totalChallenges >= prize.requirement;
        default:
          return false;
      }
    });
    setAvailablePrizes(available);
  };

  const loadClaimedPrizes = () => {
    const claimed = JSON.parse(localStorage.getItem(`empowerme_${user.uid}_claimed_prizes`) || '[]');
    setClaimedPrizes(claimed);
  };

  const claimPrize = (prize) => {
    const newClaim = {
      ...prize,
      claimedAt: new Date().toISOString(),
      weekOf: format(startOfWeek(new Date()), 'yyyy-MM-dd')
    };
    
    const updated = [...claimedPrizes, newClaim];
    setClaimedPrizes(updated);
    localStorage.setItem(`empowerme_${user.uid}_claimed_prizes`, JSON.stringify(updated));
    
    const currentPoints = parseInt(localStorage.getItem(`empowerme_${user.uid}_points`) || '0');
    localStorage.setItem(`empowerme_${user.uid}_points`, (currentPoints + prize.points).toString());
  };

  const isPrizeClaimed = (prizeId) => {
    const thisWeek = format(startOfWeek(new Date()), 'yyyy-MM-dd');
    return claimedPrizes.some(p => p.id === prizeId && p.weekOf === thisWeek);
  };

  const getTotalPoints = () => {
    return parseInt(localStorage.getItem(`empowerme_${user.uid}_points`) || '0');
  };

  return (
    <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '24px', border: '1px solid #2a2a2a' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <svg style={{ width: '20px', height: '20px', color: '#f59e0b' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Weekly Prizes</h3>
        <div style={{ marginLeft: 'auto', padding: '4px 12px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '12px', fontSize: '12px', fontWeight: '600', color: 'white' }}>
          {getTotalPoints()} Points
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div style={{ padding: '12px', background: '#2a2a2a', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#667eea' }}>{weeklyStats.completedDays || 0}/7</div>
          <div style={{ fontSize: '11px', color: '#888' }}>Days Complete</div>
        </div>
        <div style={{ padding: '12px', background: '#2a2a2a', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>{weeklyStats.currentStreak || 0}</div>
          <div style={{ fontSize: '11px', color: '#888' }}>Best Streak</div>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: 'white', fontWeight: '500' }}>Week Progress</span>
          <span style={{ fontSize: '12px', color: '#888' }}>{weeklyStats.weekProgress || 0}%</span>
        </div>
        <div style={{ height: '6px', background: '#333', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg, #667eea, #764ba2)', width: `${weeklyStats.weekProgress || 0}%`, transition: 'width 0.5s ease' }}></div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {prizes.map(prize => {
          const isAvailable = availablePrizes.some(p => p.id === prize.id);
          const isClaimed = isPrizeClaimed(prize.id);
          
          return (
            <div key={prize.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '12px', 
              background: isClaimed ? '#10b98120' : isAvailable ? '#667eea20' : '#2a2a2a', 
              border: isClaimed ? '1px solid #10b981' : isAvailable ? '1px solid #667eea' : '1px solid #333',
              borderRadius: '12px' 
            }}>
              <div style={{ width: '32px', height: '32px', background: isClaimed ? '#10b981' : isAvailable ? '#667eea' : '#666', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{prize.name}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>
                  {prize.requirement} {prize.type === 'streak' ? 'day streak' : prize.type === 'days' ? 'days complete' : 'challenges'} • {prize.points} pts
                </div>
              </div>
              {isClaimed ? (
                <div style={{ padding: '6px 12px', background: '#10b981', borderRadius: '8px', fontSize: '12px', color: 'white', fontWeight: '600' }}>
                  Claimed
                </div>
              ) : isAvailable ? (
                <button 
                  onClick={() => claimPrize(prize)}
                  style={{ padding: '6px 12px', background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Claim
                </button>
              ) : (
                <div style={{ padding: '6px 12px', background: '#333', borderRadius: '8px', fontSize: '12px', color: '#666' }}>
                  Locked
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyPrizes;