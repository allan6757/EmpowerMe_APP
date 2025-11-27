import { useState } from 'react';

const getUserStorage = (userId, key) => {
  const data = localStorage.getItem(`empowerme_${userId}_${key}`);
  return data ? JSON.parse(data) : null;
};

const setUserStorage = (userId, key, data) => {
  localStorage.setItem(`empowerme_${userId}_${key}`, JSON.stringify(data));
};

const getAllUsers = () => {
  const users = localStorage.getItem('empowerme_all_users');
  return users ? JSON.parse(users) : [];
};

const saveUser = (user) => {
  const users = getAllUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem('empowerme_all_users', JSON.stringify(users));
};
import { format } from 'date-fns';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ChallengeList from './components/ChallengeList';
import AddChallengeForm from './components/AddChallengeForm';
import ProgressBar from './components/ProgressBar';
import FriendsList from './components/Social/FriendsList';
import CalendarView from './components/Calendar/CalendarView';
import PersonalityCard from './components/PersonalityCard';
import StreakCard from './components/StreakCard';
import About from './components/About';
import PartnerTracker from './components/Social/PartnerTracker';
import WeeklyPrizes from './components/Rewards/WeeklyPrizes';
import './App.css';

const DEFAULT_CHALLENGES = [
  { id: 'default-1', text: "Practice 10 minutes of mindfulness", category: "wellness", icon: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>, completed: false, isDefault: true },
  { id: 'default-2', text: "Learn something new for 15 minutes", category: "growth", icon: <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>, completed: false, isDefault: true },
  { id: 'default-3', text: "Do something that makes you smile", category: "fun", icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>, completed: false, isDefault: true }
];

function App() {
  // Initialize demo users if none exist
  useState(() => {
    const existingUsers = localStorage.getItem('empowerme_all_users');
    if (!existingUsers) {
      const demoUsers = [
        { uid: 'demo1', name: 'Sarah Johnson', email: 'sarah@demo.com', password: 'demo123', interests: ['Fitness', 'Wellness'] },
        { uid: 'demo2', name: 'Mike Chen', email: 'mike@demo.com', password: 'demo123', interests: ['Career', 'Learning'] }
      ];
      localStorage.setItem('empowerme_all_users', JSON.stringify(demoUsers));
    }
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('empowerme_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authMode, setAuthMode] = useState('login');
  const [activeView, setActiveView] = useState('challenges');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [progressData, setProgressData] = useState(() => {
    const currentUser = localStorage.getItem('empowerme_current_user');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      return getUserStorage(userData.uid, 'progress') || {};
    }
    return {};
  });
  const [challenges, setChallenges] = useState(() => {
    const currentUser = localStorage.getItem('empowerme_current_user');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      return getUserStorage(userData.uid, 'challenges') || {};
    }
    return {};
  });

  const getCurrentDateChallenges = () => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const userChallenges = challenges[dateKey] || [];
    const defaultChallenges = DEFAULT_CHALLENGES.map(challenge => ({
      ...challenge,
      completed: userChallenges.find(c => c.id === challenge.id)?.completed || false
    }));
    return [...defaultChallenges, ...userChallenges.filter(c => !c.isDefault)];
  };

  const toggleComplete = (id) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const currentUserChallenges = challenges[dateKey] || [];
    let newChallenges;
    
    if (id.toString().startsWith('default-')) {
      const existingChallenge = currentUserChallenges.find(c => c.id === id);
      if (existingChallenge) {
        const updatedChallenges = currentUserChallenges.map(c =>
          c.id === id ? { ...c, completed: !c.completed } : c
        );
        newChallenges = { ...challenges, [dateKey]: updatedChallenges };
      } else {
        const defaultChallenge = DEFAULT_CHALLENGES.find(c => c.id === id);
        const newChallenge = { ...defaultChallenge, completed: true };
        newChallenges = { ...challenges, [dateKey]: [...currentUserChallenges, newChallenge] };
      }
    } else {
      const updatedChallenges = currentUserChallenges.map(c =>
        c.id === id ? { ...c, completed: !c.completed } : c
      );
      newChallenges = { ...challenges, [dateKey]: updatedChallenges };
    }
    
    saveChallenges(newChallenges);
    updateProgressData(dateKey);
  };

  const addChallenge = (text, category = 'wellness') => {
    const categoryIcons = {
      wellness: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>,
      growth: <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>,
      fun: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>,
      social: <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v7h2v7h3v-7h4z"/>
    };

    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const currentUserChallenges = challenges[dateKey] || [];
    const newChallenge = { id: Date.now(), text, category, icon: categoryIcons[category], completed: false, isDefault: false };
    const updatedChallenges = [...currentUserChallenges, newChallenge];
    
    saveChallenges({ ...challenges, [dateKey]: updatedChallenges });
    updateProgressData(dateKey);
  };

  const deleteChallenge = (id) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const currentUserChallenges = challenges[dateKey] || [];
    const updatedChallenges = currentUserChallenges.filter(c => c.id !== id);
    
    saveChallenges({ ...challenges, [dateKey]: updatedChallenges });
    updateProgressData(dateKey);
  };

  const editChallenge = (id, newText) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const currentUserChallenges = challenges[dateKey] || [];
    const updatedChallenges = currentUserChallenges.map(c => 
      c.id === id ? { ...c, text: newText } : c
    );
    
    saveChallenges({ ...challenges, [dateKey]: updatedChallenges });
  };

  const updateProgressData = (dateKey) => {
    const allChallenges = getCurrentDateChallenges();
    const completed = allChallenges.filter(c => c.completed).length;
    const newProgressData = { ...progressData, [dateKey]: { completed, total: allChallenges.length } };
    setProgressData(newProgressData);
    if (user) {
      setUserStorage(user.uid, 'progress', newProgressData);
    }
  };

  const saveUserData = (userData) => {
    setUser(userData);
    saveUser(userData);
    localStorage.setItem('empowerme_current_user', JSON.stringify(userData));
  };

  const saveChallenges = (newChallenges) => {
    setChallenges(newChallenges);
    if (user) {
      setUserStorage(user.uid, 'challenges', newChallenges);
    }
  };

  if (!user) {
    return authMode === 'login' ? (
      <Login onLogin={saveUserData} switchToSignup={() => setAuthMode('signup')} />
    ) : (
      <Signup onSignup={saveUserData} switchToLogin={() => setAuthMode('login')} />
    );
  }

  const currentChallenges = getCurrentDateChallenges();
  const completedCount = currentChallenges.filter(c => c.completed).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>EmpowerMe</h1>
              <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>Welcome back, {user.name}</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {['challenges', 'calendar', 'social', 'rewards', 'about'].map(view => (
              <button key={view} onClick={() => setActiveView(view)} style={{ padding: '8px 16px', background: activeView === view ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#2a2a2a', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', cursor: 'pointer', textTransform: 'capitalize' }}>
                {view === 'about' ? '?' : view === 'rewards' ? '★' : view}
              </button>
            ))}
            <button onClick={() => { setUser(null); localStorage.removeItem('empowerme_current_user'); }} style={{ padding: '8px 16px', background: '#333', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', cursor: 'pointer' }}>Logout</button>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: activeView === 'challenges' ? '2fr 1fr' : '1fr', gap: '20px' }}>
          {activeView === 'challenges' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <PersonalityCard user={user} progressData={progressData} />
                <ProgressBar total={currentChallenges.length} completed={completedCount} />
                <ChallengeList challenges={currentChallenges} onToggleComplete={toggleComplete} onDelete={deleteChallenge} onEdit={editChallenge} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <AddChallengeForm onAddChallenge={addChallenge} />
                <StreakCard progressData={progressData} />
                <PartnerTracker user={user} />
              </div>
            </>
          )}
          
          {activeView === 'calendar' && (
            <CalendarView selectedDate={selectedDate} onDateSelect={setSelectedDate} progressData={progressData} />
          )}
          
          {activeView === 'social' && (
            <FriendsList user={user} />
          )}
          
          {activeView === 'rewards' && (
            <WeeklyPrizes user={user} progressData={progressData} />
          )}
          
          {activeView === 'about' && (
            <About />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;