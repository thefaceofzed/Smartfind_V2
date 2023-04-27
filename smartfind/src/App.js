import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Form from './components/Form';
import SmartCard from './components/SmartCard';
import './index.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showSmartCard, setShowSmartCard] = useState(false);

  const handleToggleForm = (isLogin) => {
    setShowLogin(isLogin);
    setShowForm(!isLogin);
    setShowSmartCard(false);
  };

  const handleSignInClick = () => {
    setShowForm(false);
    setShowSmartCard(false);
    setShowLogin(true);
  };

  const handleSignUpClick = () => {
    setShowLogin(false);
    setShowForm(true);
    setShowSmartCard(false);
  };

  const handleSubmitForm = (data) => {
    setUserData(data);
    setShowForm(false);
    setShowLogin(false);
    setShowSmartCard(true);
  };

  return (
    <div>
      {showForm ? (
        <Signup
          handleToggleForm={handleToggleForm}
          handleSignUpClick={handleSignUpClick}
        />
      ) : userData ? (
        <SmartCard userData={userData} showSmartCard={showSmartCard} />
      ) : showLogin ? (
        <Login
          handleSignUpClick={handleSignUpClick}
          handleFormClick={() => handleToggleForm(false)}
          handleToggleForm={handleToggleForm}
        />
      ) : (
        <Form
          onSubmit={handleSubmitForm}
          handleSignInClick={handleSignInClick}
          handleToggleForm={handleToggleForm}
          setShowSmartCard={setShowSmartCard}
        />
      )}
    </div>
  );
}

export default App;
