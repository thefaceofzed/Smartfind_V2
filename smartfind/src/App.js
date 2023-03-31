import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css';
function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <Login handleSignUpClick={handleToggleForm} /> // Updated prop name
      ) : (
        <Signup handleToggleForm={handleToggleForm} />
      )}
    </div>
  );
}

export default App;
