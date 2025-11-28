// ===== SIGNUP COMPONENT =====
// This component handles user registration/account creation

// Import React hook for managing component state
import { useState } from 'react';

// Signup component receives props from parent (App.jsx)
// onSignup: function to call when user successfully signs up
// switchToLogin: function to switch back to login form
function Signup({ onSignup, switchToLogin }) {
  
  // ===== STATE VARIABLES =====
  // Form data object to store all user input
  const [formData, setFormData] = useState({ 
    name: '',        // User's full name
    email: '',       // User's email address
    password: '',    // User's password
    interests: []    // Array of selected interests
  });
  
  // Error message to show if something goes wrong
  const [error, setError] = useState('');
  
  // Available interest options for users to choose from
  const interests = ['Fitness', 'Wellness', 'Career', 'Learning', 'Social', 'Creative'];

  // ===== FORM SUBMISSION HANDLER =====
  // This function runs when user clicks "Create Account" button
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
    setError('');       // Clear any previous error messages
    
    // Get all existing users from browser storage
    const users = JSON.parse(localStorage.getItem('empowerme_all_users') || '[]');
    
    // Check if someone already has this email address
    const existingUser = users.find(u => u.email === formData.email);
    
    // If email already exists, show error and stop
    if (existingUser) {
      setError('An account with this email already exists. Please sign in instead.');
      return;
    }
    
    // Make sure user selected at least one interest
    if (formData.interests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    
    // If everything is valid, create the account
    // uid: unique user ID using timestamp
    // ...formData: spread operator to include all form data
    onSignup({ uid: Date.now().toString(), ...formData });
  };

  // ===== INTEREST SELECTION HANDLER =====
  // This function adds/removes interests when user clicks interest buttons
  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev, // Keep all other form data the same
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)  // Remove if already selected
        : [...prev.interests, interest]               // Add if not selected
    }));
  };

  // ===== RENDER UI =====
  // Return JSX that describes what to show on screen
  return (
    // Main container - full screen with dark background
    <div style={{ 
      minHeight: '100vh',        // Full viewport height
      background: '#0a0a0a',     // Dark black background
      display: 'flex',           // Flexbox for centering
      alignItems: 'center',      // Center vertically
      justifyContent: 'center',  // Center horizontally
      padding: '20px'            // Space around edges
    }}>
      {/* Form container - centered card */}
      <div style={{ width: '100%', maxWidth: '400px' }}>
        
        {/* Header section with title and subtitle */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '8px' 
          }}>
            Create Account
          </h1>
          <p style={{ color: '#888', fontSize: '16px' }}>
            Join the community and start your journey
          </p>
        </div>

        {/* Signup form - calls handleSubmit when submitted */}
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px' 
        }}>
          
          {/* Name input field */}
          <input
            type="text"
            placeholder="Full name"
            value={formData.name}  // Controlled input - value comes from state
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              name: e.target.value  // Update name in state when user types
            }))}
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: '#1a1a1a',  // Dark input background
              border: '1px solid #333', 
              borderRadius: '16px', 
              color: 'white', 
              fontSize: '16px', 
              outline: 'none' 
            }}
            required  // HTML5 validation - field must be filled
          />
          
          {/* Email input field */}
          <input
            type="email"  // HTML5 email validation
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              email: e.target.value 
            }))}
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: '#1a1a1a', 
              border: '1px solid #333', 
              borderRadius: '16px', 
              color: 'white', 
              fontSize: '16px', 
              outline: 'none' 
            }}
            required
          />
          
          {/* Password input field */}
          <input
            type="password"  // Hides password text
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              password: e.target.value 
            }))}
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: '#1a1a1a', 
              border: '1px solid #333', 
              borderRadius: '16px', 
              color: 'white', 
              fontSize: '16px', 
              outline: 'none' 
            }}
            required
          />

          {/* Interest selection section */}
          <div>
            <p style={{ 
              color: 'white', 
              marginBottom: '12px', 
              fontSize: '16px', 
              fontWeight: '500' 
            }}>
              Select your interests:
            </p>
            
            {/* Grid of interest buttons */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr',  // 2 columns
              gap: '8px' 
            }}>
              {/* Loop through each interest and create a button */}
              {interests.map(interest => (
                <button
                  key={interest}  // React needs unique key for each item
                  type="button"   // Prevent form submission
                  onClick={() => toggleInterest(interest)}  // Add/remove interest
                  style={{
                    padding: '12px',
                    // Change background if interest is selected
                    background: formData.interests.includes(interest) 
                      ? 'linear-gradient(135deg, #667eea, #764ba2)'  // Selected: gradient
                      : '#1a1a1a',                                    // Not selected: dark
                    border: '1px solid #333',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {interest}  {/* Display interest name */}
                </button>
              ))}
            </div>
          </div>

          {/* Error message - only shows if there's an error */}
          {error && (
            <div style={{ 
              padding: '12px', 
              background: '#fee2e2',    // Light red background
              border: '1px solid #fecaca', 
              borderRadius: '12px', 
              color: '#dc2626',         // Dark red text
              fontSize: '14px', 
              textAlign: 'center' 
            }}>
              {error}  {/* Display the error message */}
            </div>
          )}
          
          {/* Submit button - creates the account */}
          <button 
            type="submit"  // Triggers form submission
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: 'linear-gradient(135deg, #667eea, #764ba2)',  // Purple gradient
              color: 'white', 
              border: 'none', 
              borderRadius: '16px', 
              fontSize: '16px', 
              fontWeight: '600', 
              cursor: 'pointer' 
            }}
          >
            Create Account
          </button>
        </form>

        {/* Switch to login link */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <span style={{ color: '#888' }}>Already have an account? </span>
          <button 
            onClick={switchToLogin}  // Switch back to login form
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#667eea',     // Blue link color
              cursor: 'pointer', 
              fontSize: '16px', 
              fontWeight: '600' 
            }}
          >
            Sign in
          </button>
        </div>
      </div>  {/* End form container */}
    </div>     {/* End main container */}
  );  // End return statement
}  // End Signup function

// Export component so other files can import and use it
export default Signup;