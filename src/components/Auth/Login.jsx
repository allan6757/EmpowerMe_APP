import { useState } from 'react';

function Login({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const users = JSON.parse(localStorage.getItem('empowerme_all_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password. Please check your credentials or sign up.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg style={{ width: '30px', height: '30px', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>Welcome back</h1>
          <p style={{ color: '#888', fontSize: '16px' }}>Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '16px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '16px', color: 'white', fontSize: '16px', outline: 'none' }}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '16px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '16px', color: 'white', fontSize: '16px', outline: 'none' }}
            required
          />

          {error && (
            <div style={{ padding: '12px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '12px', color: '#dc2626', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
            Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <span style={{ color: '#888' }}>Don't have an account? </span>
          <button onClick={switchToSignup} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;