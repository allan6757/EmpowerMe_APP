import { useState } from 'react';

function Signup({ onSignup, switchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', interests: [] });
  const [error, setError] = useState('');
  const interests = ['Fitness', 'Wellness', 'Career', 'Learning', 'Social', 'Creative'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const users = JSON.parse(localStorage.getItem('empowerme_all_users') || '[]');
    const existingUser = users.find(u => u.email === formData.email);
    
    if (existingUser) {
      setError('An account with this email already exists. Please sign in instead.');
      return;
    }
    
    if (formData.interests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    
    onSignup({ uid: Date.now().toString(), ...formData });
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>Create Account</h1>
          <p style={{ color: '#888', fontSize: '16px' }}>Join the community and start your journey</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            style={{ width: '100%', padding: '16px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '16px', color: 'white', fontSize: '16px', outline: 'none' }}
            required
          />
          
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            style={{ width: '100%', padding: '16px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '16px', color: 'white', fontSize: '16px', outline: 'none' }}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            style={{ width: '100%', padding: '16px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '16px', color: 'white', fontSize: '16px', outline: 'none' }}
            required
          />

          <div>
            <p style={{ color: 'white', marginBottom: '12px', fontSize: '16px', fontWeight: '500' }}>Select your interests:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {interests.map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  style={{
                    padding: '12px',
                    background: formData.interests.includes(interest) ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{ padding: '12px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '12px', color: '#dc2626', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
            Create Account
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <span style={{ color: '#888' }}>Already have an account? </span>
          <button onClick={switchToLogin} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;