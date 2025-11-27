import { useState, useEffect } from 'react';

function PersonalityCard({ user, progressData }) {
  const [quote, setQuote] = useState('');
  const [personality, setPersonality] = useState('');

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const calculatePersonality = () => {
    const totalDays = Object.keys(progressData).length;
    const completedDays = Object.values(progressData).filter(day => day.completed === day.total && day.total > 0).length;
    const avgCompletion = totalDays > 0 ? (Object.values(progressData).reduce((sum, day) => sum + (day.total > 0 ? day.completed / day.total : 0), 0) / totalDays) * 100 : 0;

    if (avgCompletion >= 90) return { type: 'Achiever', icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>, color: '#10b981', desc: 'You consistently crush your goals!', bg: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop' };
    if (avgCompletion >= 75) return { type: 'Warrior', icon: <path d="M13 10V3L4 14h7v7l9-11h-7z"/>, color: '#667eea', desc: 'Strong and determined in your journey!', bg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop' };
    if (avgCompletion >= 50) return { type: 'Explorer', icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>, color: '#f59e0b', desc: 'Always pushing forward and growing!', bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop' };
    if (avgCompletion >= 25) return { type: 'Starter', icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>, color: '#8b5cf6', desc: 'Building momentum every day!', bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop' };
    return { type: 'Dreamer', icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>, color: '#ec4899', desc: 'Ready to turn dreams into reality!', bg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop' };
  };

  useEffect(() => {
    fetch('https://api.quotable.io/random?tags=motivational,success,inspirational')
      .then(res => res.json())
      .then(data => setQuote(data.content))
      .catch(() => setQuote('Believe in yourself and all that you are.'));
    
    setPersonality(calculatePersonality());
  }, [progressData]);

  return (
    <div style={{ background: `linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9)), url(${personality.bg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '20px', padding: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', borderRadius: '20px' }}></div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0' }}>
            {getTimeGreeting()}, {user.name}!
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: personality.color, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                {personality.icon}
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>
                {personality.type}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                {personality.desc}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '14px', fontStyle: 'italic', lineHeight: 1.4, marginBottom: '8px' }}>
            "{quote}"
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8, textAlign: 'right' }}>
            - Daily Inspiration
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalityCard;