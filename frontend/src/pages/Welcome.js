import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can also clear session/local storage here if used
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Welcome!</h2>
      <p>You have successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;
