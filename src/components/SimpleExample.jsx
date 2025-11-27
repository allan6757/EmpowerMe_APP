// ===== SIMPLE REACT COMPONENT EXAMPLE =====
// This shows the basic structure of a React component

import { useState } from 'react'; // Import React hook for state management

// This is a functional component - the modern way to write React components
function SimpleExample() {
  // ===== STATE VARIABLES =====
  // useState creates a variable that can change and update the UI
  const [count, setCount] = useState(0); // Start with count = 0
  const [name, setName] = useState(''); // Start with empty name
  
  // ===== EVENT HANDLERS =====
  // Functions that run when user interacts with the UI
  
  // Function to increase count by 1
  const increaseCount = () => {
    setCount(count + 1); // Update count state
  };
  
  // Function to handle input changes
  const handleNameChange = (event) => {
    setName(event.target.value); // Get text from input and update name state
  };
  
  // ===== RENDER UI =====
  // Return JSX (HTML-like code) that describes what to show on screen
  return (
    <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '10px' }}>
      {/* Title */}
      <h2>Simple React Example</h2>
      
      {/* Display current count */}
      <p>Count: {count}</p>
      
      {/* Button to increase count */}
      <button onClick={increaseCount} style={{ padding: '10px', margin: '5px' }}>
        Click to Increase Count
      </button>
      
      {/* Input for name */}
      <input 
        type="text" 
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
        style={{ padding: '10px', margin: '5px' }}
      />
      
      {/* Show greeting if name is entered */}
      {name && <p>Hello, {name}!</p>}
    </div>
  );
}

// Export component so other files can use it
export default SimpleExample;