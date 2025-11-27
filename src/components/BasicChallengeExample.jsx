// ===== BASIC CHALLENGE COMPONENT =====
// Simplified version of our challenge system for learning

import { useState } from 'react';

function BasicChallengeExample() {
  // ===== STATE: DATA THAT CAN CHANGE =====
  
  // List of challenges (array of objects)
  const [challenges, setChallenges] = useState([
    { id: 1, text: 'Drink water', completed: false },
    { id: 2, text: 'Exercise 10 minutes', completed: false },
    { id: 3, text: 'Read a book', completed: true }
  ]);
  
  // Text for new challenge
  const [newChallengeText, setNewChallengeText] = useState('');
  
  // ===== FUNCTIONS: WHAT THE APP CAN DO =====
  
  // Toggle challenge between completed/not completed
  const toggleChallenge = (id) => {
    // Map creates a new array with updated values
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === id) {
        // If this is the challenge we clicked, flip its completed status
        return { ...challenge, completed: !challenge.completed };
      }
      // Otherwise, keep challenge unchanged
      return challenge;
    });
    
    setChallenges(updatedChallenges); // Update state with new array
  };
  
  // Add a new challenge
  const addChallenge = () => {
    // Only add if there's text
    if (newChallengeText.trim()) {
      const newChallenge = {
        id: Date.now(), // Use timestamp as unique ID
        text: newChallengeText,
        completed: false
      };
      
      // Add new challenge to existing list
      setChallenges([...challenges, newChallenge]);
      setNewChallengeText(''); // Clear input
    }
  };
  
  // Calculate how many challenges are completed
  const completedCount = challenges.filter(challenge => challenge.completed).length;
  
  // ===== RENDER: WHAT SHOWS ON SCREEN =====
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      {/* Header */}
      <h2>My Daily Challenges</h2>
      
      {/* Progress */}
      <p>Progress: {completedCount} of {challenges.length} completed</p>
      
      {/* Add new challenge */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type=\"text\"
          placeholder=\"Add a new challenge...\"
          value={newChallengeText}
          onChange={(e) => setNewChallengeText(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
        <button 
          onClick={addChallenge}
          style={{ padding: '10px', marginLeft: '10px' }}
        >
          Add
        </button>
      </div>
      
      {/* List of challenges */}
      <div>
        {challenges.map(challenge => (
          <div 
            key={challenge.id} 
            style={{ 
              padding: '10px', 
              margin: '5px 0', 
              background: challenge.completed ? '#d4edda' : '#f8f9fa',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={() => toggleChallenge(challenge.id)}
          >
            {/* Checkbox */}
            <input 
              type=\"checkbox\" 
              checked={challenge.completed}
              readOnly
              style={{ marginRight: '10px' }}
            />
            
            {/* Challenge text */}
            <span style={{ 
              textDecoration: challenge.completed ? 'line-through' : 'none' 
            }}>
              {challenge.text}
            </span>
          </div>
        ))}
      </div>
      
      {/* Show message when all done */}
      {completedCount === challenges.length && challenges.length > 0 && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          🎉 All challenges completed! Great job!
        </p>
      )}
    </div>
  );
}

export default BasicChallengeExample;