function About() {
  return (
    <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '32px', border: '1px solid #2a2a2a', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg style={{ width: '40px', height: '40px', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>EmpowerMe</h1>
        <p style={{ fontSize: '18px', color: '#888', maxWidth: '500px', margin: '0 auto' }}>
          Transform your daily routine into a journey of personal growth and achievement
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ padding: '24px', background: `linear-gradient(135deg, rgba(42, 42, 42, 0.9), rgba(42, 42, 42, 0.9)), url(https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=200&fit=crop)`, backgroundSize: 'cover', borderRadius: '16px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', borderRadius: '16px' }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: '40px', height: '40px', background: '#667eea', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>Daily Challenges</h3>
            <p style={{ fontSize: '14px', color: '#ccc', lineHeight: 1.5 }}>
              Set and track meaningful daily goals that align with your personal growth journey.
            </p>
          </div>
        </div>

        <div style={{ padding: '24px', background: `linear-gradient(135deg, rgba(42, 42, 42, 0.9), rgba(42, 42, 42, 0.9)), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop)`, backgroundSize: 'cover', borderRadius: '16px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', borderRadius: '16px' }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: '40px', height: '40px', background: '#10b981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v7h2v7h3v-7h4z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>Social Connection</h3>
            <p style={{ fontSize: '14px', color: '#ccc', lineHeight: 1.5 }}>
              Connect with like-minded individuals and build a supportive community around your goals.
            </p>
          </div>
        </div>

        <div style={{ padding: '24px', background: `linear-gradient(135deg, rgba(42, 42, 42, 0.9), rgba(42, 42, 42, 0.9)), url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop)`, backgroundSize: 'cover', borderRadius: '16px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', borderRadius: '16px' }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: '40px', height: '40px', background: '#f59e0b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>Progress Tracking</h3>
            <p style={{ fontSize: '14px', color: '#ccc', lineHeight: 1.5 }}>
              Visualize your progress with detailed analytics and celebrate your achievements.
            </p>
          </div>
        </div>

        <div style={{ padding: '24px', background: `linear-gradient(135deg, rgba(42, 42, 42, 0.9), rgba(42, 42, 42, 0.9)), url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop)`, backgroundSize: 'cover', borderRadius: '16px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', borderRadius: '16px' }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: '40px', height: '40px', background: '#8b5cf6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>Personality Insights</h3>
            <p style={{ fontSize: '14px', color: '#ccc', lineHeight: 1.5 }}>
              Discover your unique achievement personality based on your completion patterns.
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px', background: 'linear-gradient(135deg, #667eea20, #764ba220)', borderRadius: '16px', border: '1px solid #667eea30', textAlign: 'center' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>Our Mission</h3>
        <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
          We believe that small daily actions lead to extraordinary transformations. EmpowerMe is designed to make personal growth 
          engaging, social, and sustainable by turning your goals into a rewarding daily practice.
        </p>
      </div>

      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Version 1.0.0</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Built with passion for personal growth enthusiasts</div>
      </div>
    </div>
  );
}

export default About;